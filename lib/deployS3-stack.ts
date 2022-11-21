import { Stack, StackProps, Duration, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import * as Route53 from 'aws-cdk-lib/aws-route53';
import * as Route53Targets from 'aws-cdk-lib/aws-route53-targets';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';

interface WebStackProps extends StackProps {
  subdomainName: string;
  hostedZoneName: string;
  hostedZoneId: string;
  globalCertArnForHostedZone: string;
}

// todo: this could probably be split into smaller constructs as it's getting fairly big
export class DeployStack extends Stack {
  constructor(scope: Construct, id: string, props: WebStackProps) {
    super(scope, id, props);

    const {
      subdomainName,
      hostedZoneName,
      hostedZoneId,
      globalCertArnForHostedZone,
    } = props;

   
    // todo: try to restrict invoke permissions to only cloudfront somehow?
    // This example uses WAF Web ACL to check a header added by cloudfront:
    // https://www.wellarchitectedlabs.com/security/300_labs/300_multilayered_api_security_with_cognito_and_waf/3_prevent_requests_from_accessing_api_directly/
    // Perhaps this could also be accomplished with a custom lambda authorizer in API Gateway?
    // Understand the cost and latency difference for WAF vs running an extra lambda for every request.

    // Frontend
    const bucket = new s3.Bucket(this, 'FrontendReactBucket', {
      removalPolicy: RemovalPolicy.DESTROY, // all objects can be restored from code
      autoDeleteObjects: true,
      encryption: s3.BucketEncryption.S3_MANAGED,

      // Couldn't get error page redirection to work with cloudfront.
      // I think that needs public permissions to work, not just origina access identity permission,
      // so doing error page redirection in cloudfront instead.
    });
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'OriginAccessIdentity');
    bucket.grantRead(originAccessIdentity);

    // Cloudfront
    
    const distribution = new cloudfront.Distribution(this, 'FrontendStaticDistribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(bucket, { originAccessIdentity }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      domainNames: [`${subdomainName}.${hostedZoneName}`],
      certificate: Certificate.fromCertificateArn(
        this,
        'SSLCertificate',
        globalCertArnForHostedZone
      ),
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          // redirect 404's to our app's index.html, so routes within our front-end app will work
          // see notes below for ideas for a better solution if google SEO is important
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
    });
    /***
      TODO: (but probably not worth bothering with yet)
      A better solution than redirecting 404 pages back to the single-page-app's index.html may be able to:
      - use lambda @ edge to have a (precompiled) list of valid routes from front-end app's React-Router component,
      - redirecting/rewriting those to the index.html
      - allow others through for cloudfront to return 404's from S3 when objects don't exist.
      - other assets/images which actually exist would still be returned fine as usual.
      Could also return some 404's early from lambda@edge if they are for paths without a file extension
      which don't match a known route from the single-page-app.
      This may be the best way to prevent SEO being negatively impacted by google crawler's never getting a real 404 HTTP response code back when visiting non-existen pages. (so this might only be worth doing on a main/marketing website)
      Another option is generating a separate version of index.html for each route / 'page' of the site, this may
      offer some other benefits like being able to use code-splitting when bundling javascript code and assets,
      so a page which needs less functionality can have a smaller file size. Rather than having to download
      all the code for the entire app just to visit one 'page'.
      If you're going to all this effort you might also consider trying to return server-side-rendered react code from
      lambda@edge. Again, letting it return 404 for routes which don't exist or that aren't an asset in S3. I think you would have to go to a lot of trouble to split code up per route though to keep the lambda functon size even smaller for edge functions.
     */

    // Frontend code and assets deployment
    new s3Deploy.BucketDeployment(this, 'DeployFrontend', {
      sources: [s3Deploy.Source.asset('reactwebapp/build')],
      destinationBucket: bucket,
      // ensures cloudfront cache invalidation on deploy:
      distribution: distribution,
    });

    // DNS records
    const zone = Route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
      zoneName: hostedZoneName,
      hostedZoneId: hostedZoneId,
    });
    new Route53.ARecord(this, 'SubdomainARecord', {
      zone: zone,
      recordName: subdomainName, // todo: probably suffix with env for dev and test
      target: Route53.RecordTarget.fromAlias(new Route53Targets.CloudFrontTarget(distribution)),
    });
    new Route53.AaaaRecord(this, 'SubdomainAAAARecord', {
      zone: zone,
      recordName: subdomainName, // todo: probably suffix with env for dev and test
      target: Route53.RecordTarget.fromAlias(new Route53Targets.CloudFrontTarget(distribution)),
    });

    // todo: add outputs for things like full domain name / url
  }
}