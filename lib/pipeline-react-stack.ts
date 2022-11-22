import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodeBuildStep, CodePipeline, CodePipelineSource } from 'aws-cdk-lib/pipelines';
import { DeployPipelineStage } from './deploy-stage';



export class ReactPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const branch = 'master';
    const gitHubUsernameRepository = 'matps7/cicd-pipeline-reactApp';

    const pipeline = new CodePipeline(this, 'Pipeline', {
        pipelineName: "MyCDKPipeline",
        synth: new CodeBuildStep('SynthStep', {
            input: CodePipelineSource.connection('owner/repo', 'master', {
            connectionArn: 'secret-arn'
            }),
            installCommands: [
              'npm install -g aws-cdk'
            ],
            commands: [
                'npm install',
                'npm ci',
                'npm run build',
                'cdk synth'
            ],
            buildEnvironment: {
              buildImage: cdk.aws_codebuild.LinuxBuildImage.AMAZON_LINUX_2_4,
            }
            }),codeBuildDefaults: {
              buildEnvironment: {
                buildImage: cdk.aws_codebuild.LinuxBuildImage.AMAZON_LINUX_2_4,
              },
              partialBuildSpec: cdk.aws_codebuild.BuildSpec.fromObject({
                env:{
                  'shell':'bash',
              },
              phases: {
                install: {
                    "runtime-versions": {
                        nodejs: "16"
                      }
                }
              }
          })
      }
    });

    const deploy = new DeployPipelineStage(this, 'Deploy');
    const deployStage = pipeline.addStage(deploy);

  }
}
