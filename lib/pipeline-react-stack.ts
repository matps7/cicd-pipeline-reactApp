import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodeBuildStep, CodePipeline, CodePipelineSource, } from 'aws-cdk-lib/pipelines';

export class ReactPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const branch = 'master';
    const gitHubUsernameRepository = 'matps7/cicd-pipeline-reactApp';

    const pipeline = new CodePipeline(this, 'Pipeline', {
        pipelineName: "MyCDKPipeline",
        synth: new CodeBuildStep('SynthStep', {
            input: CodePipelineSource.connection('matps7/cicd-pipeline-reactApp', 'master', {
  connectionArn: 'arn:aws:codestar-connections:ap-southeast-2:991679131068:connection/c64f0002-e4f9-428d-820f-1f8e0cddaad5'
            }),
            commands: [
                'npm ci',
                'npm run build'
            ],
            buildEnvironment: {
              buildImage: cdk.aws_codebuild.LinuxBuildImage.AMAZON_LINUX_2_4,
            }
        }),codeBuildDefaults: {
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
        },
        artifacts: {
          "base-directory": "reactwebapp/build",
          "files": "**/*"
        }
          })
        }
    });
  }
}