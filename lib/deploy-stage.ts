import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DeployStack } from './deployS3-stack';
import { InfrastuctureStack } from './infrastructure-stack';

export class DeployPipelineStage extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);
        
        new DeployStack(this, 'ReactDeploy');
        
    }
}
