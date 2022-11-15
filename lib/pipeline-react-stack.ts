import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

export class ReactPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, 'Pipeline', {
      pipelineName: 'reactPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('KZNGroup/cicd-pipeline-react', 'main'),
        commands: ['npm install', 'npm run build', 'npx cdk synth'],
      }),
    });
  }
}