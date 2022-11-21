import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DeployStack } from './deployS3-stack';

export class DeployPipelineStage extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);
        
        new DeployStack(this, 'ReactDeploy', {
            subdomainName: 'matteoreact',
            hostedZoneName: 'lametech.net',
            hostedZoneId: 'Z326B94TVFYXI9',
            globalCertArnForHostedZone:
              'arn:aws:acm:us-east-1:991679131068:certificate/b7f4bc23-6cf2-480a-aae6-f3f683a0d487',
          });
        
    }
}
