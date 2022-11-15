import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { Table } from 'aws-cdk-lib/aws-dynamodb';

interface WebStackProps extends StackProps {
  dynamodbTable: Table;
  subdomainName: string;
  hostedZoneName: string;
  hostedZoneId: string;
  globalCertArnForHostedZone: string;
}

// todo: this could probably be split into smaller constructs as it's getting fairly big
export class InfrastuctureStack extends Stack {
  constructor(scope: Construct, id: string, props: WebStackProps) {
    super(scope, id, props);

    const {
      subdomainName,
      hostedZoneName,
      globalCertArnForHostedZone,
    } = props;

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

    // Frontend code and assets deployment
    new s3Deploy.BucketDeployment(this, 'DeployFrontend', {
      sources: [s3Deploy.Source.asset('reactwebapp/build')],
      destinationBucket: bucket,
      // ensures cloudfront cache invalidation on deploy:
      distribution: distribution,
    });

    // todo: add outputs for things like full domain name / url
  }
}
