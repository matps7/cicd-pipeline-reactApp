import { Stack, RemovalPolicy } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';

// todo: this could probably be split into smaller constructs as it's getting fairly big
export class DeployStack extends Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Frontend
    const bucket = new s3.Bucket(this, 'FrontendReactBucket', {
      removalPolicy: RemovalPolicy.DESTROY, // all objects can be restored from code
      autoDeleteObjects: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
      // Couldn't get error page redirection to work with cloudfront.
      // I think that needs public permissions to work, not just original access identity permission,
      // so doing error page redirection in cloudfront instead.
    });

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'OriginAccessIdentity');
    bucket.grantRead(originAccessIdentity);

    const distribution = new cloudfront.Distribution(this, 'FrontendStaticDistribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(bucket, { originAccessIdentity }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html'
    });

    // Frontend code and assets deployment
    new s3Deploy.BucketDeployment(this, 'DeployFrontend', {
      sources: [s3Deploy.Source.asset('reactwebapp/build')],
      destinationBucket: bucket,
      // ensures cloudfront cache invalidation on deploy:
      distribution: distribution,
    });
  }
}
