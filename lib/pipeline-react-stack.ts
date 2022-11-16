import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodeBuildStep, CodePipeline, CodePipelineSource } from 'aws-cdk-lib/pipelines';


export class ReactPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const branch = 'master';
    const gitHubUsernameRepository = 'matps7/cicd-pipeline-reactApp';

    const pipeline = new CodePipeline(this, 'Pipeline', {
        pipelineName: "MyCDKPipeline",
        synth: new CodeBuildStep('SynthStep', {
            input: CodePipelineSource.gitHub(gitHubUsernameRepository, branch, {
                authentication: cdk.SecretValue.secretsManager('secret-token'),
            }),
            installCommands: [
                'npm install -g aws-cdk'
            ],
            commands: [
                'npm install',
                'npm ci',
                'npm run build',
                'npx cdk synth'
            ]
        })
    });
  }
}
