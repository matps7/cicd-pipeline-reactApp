"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactPipelineStack = void 0;
const cdk = require("aws-cdk-lib");
const pipelines_1 = require("aws-cdk-lib/pipelines");
class ReactPipelineStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const branch = 'master';
        const gitHubUsernameRepository = 'matps7/cicd-pipeline-reactApp';
        const pipeline = new pipelines_1.CodePipeline(this, 'Pipeline', {
            pipelineName: "MyCDKPipeline",
            selfMutation: false,
            synth: new pipelines_1.CodeBuildStep('SynthStep', {
                input: pipelines_1.CodePipelineSource.connection('matps7/cicd-pipeline-reactApp', 'master', {
                    connectionArn: 'arn:aws:codestar-connections:ap-southeast-2:991679131068:connection/c64f0002-e4f9-428d-820f-1f8e0cddaad5'
                }),
                commands: [
                    'npm ci',
                    'npm run build'
                ],
                buildEnvironment: {
                    buildImage: cdk.aws_codebuild.LinuxBuildImage.AMAZON_LINUX_2_4,
                }
            }), codeBuildDefaults: {
                partialBuildSpec: cdk.aws_codebuild.BuildSpec.fromObject({
                    env: {
                        'shell': 'bash',
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
    }
}
exports.ReactPipelineStack = ReactPipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtcmVhY3Qtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1yZWFjdC1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFFbkMscURBQXdGO0FBR3hGLE1BQWEsa0JBQW1CLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDL0MsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUM7UUFDeEIsTUFBTSx3QkFBd0IsR0FBRywrQkFBK0IsQ0FBQztRQUVqRSxNQUFNLFFBQVEsR0FBRyxJQUFJLHdCQUFZLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUNoRCxZQUFZLEVBQUUsZUFBZTtZQUM3QixZQUFZLEVBQUUsS0FBSztZQUNuQixLQUFLLEVBQUUsSUFBSSx5QkFBYSxDQUFDLFdBQVcsRUFBRTtnQkFDbEMsS0FBSyxFQUFFLDhCQUFrQixDQUFDLFVBQVUsQ0FBQywrQkFBK0IsRUFBRSxRQUFRLEVBQUU7b0JBQ2hGLGFBQWEsRUFBRSwwR0FBMEc7aUJBQ3hILENBQUM7Z0JBQ0YsUUFBUSxFQUFFO29CQUNOLFFBQVE7b0JBQ1IsZUFBZTtpQkFDbEI7Z0JBQ0QsZ0JBQWdCLEVBQUU7b0JBQ2hCLFVBQVUsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0I7aUJBQy9EO2FBQ0EsQ0FBQyxFQUFDLGlCQUFpQixFQUFFO2dCQUNwQixnQkFBZ0IsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7b0JBQ3ZELEdBQUcsRUFBQzt3QkFDRixPQUFPLEVBQUMsTUFBTTtxQkFDakI7b0JBQ0QsTUFBTSxFQUFFO3dCQUNOLE9BQU8sRUFBRTs0QkFDTCxrQkFBa0IsRUFBRTtnQ0FDaEIsTUFBTSxFQUFFLElBQUk7NkJBQ2Y7eUJBQ0o7cUJBQ0o7aUJBQ0UsQ0FBQzthQUNIO1NBQ0YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNOO0FBckNELGdEQXFDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XHJcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xyXG5pbXBvcnQgeyBDb2RlQnVpbGRTdGVwLCBDb2RlUGlwZWxpbmUsIENvZGVQaXBlbGluZVNvdXJjZSB9IGZyb20gJ2F3cy1jZGstbGliL3BpcGVsaW5lcyc7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFJlYWN0UGlwZWxpbmVTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XHJcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xyXG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XHJcblxyXG4gICAgY29uc3QgYnJhbmNoID0gJ21hc3Rlcic7XHJcbiAgICBjb25zdCBnaXRIdWJVc2VybmFtZVJlcG9zaXRvcnkgPSAnbWF0cHM3L2NpY2QtcGlwZWxpbmUtcmVhY3RBcHAnO1xyXG5cclxuICAgIGNvbnN0IHBpcGVsaW5lID0gbmV3IENvZGVQaXBlbGluZSh0aGlzLCAnUGlwZWxpbmUnLCB7XHJcbiAgICAgICAgcGlwZWxpbmVOYW1lOiBcIk15Q0RLUGlwZWxpbmVcIixcclxuICAgICAgICBzZWxmTXV0YXRpb246IGZhbHNlLFxyXG4gICAgICAgIHN5bnRoOiBuZXcgQ29kZUJ1aWxkU3RlcCgnU3ludGhTdGVwJywge1xyXG4gICAgICAgICAgICBpbnB1dDogQ29kZVBpcGVsaW5lU291cmNlLmNvbm5lY3Rpb24oJ21hdHBzNy9jaWNkLXBpcGVsaW5lLXJlYWN0QXBwJywgJ21hc3RlcicsIHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbkFybjogJ2Fybjphd3M6Y29kZXN0YXItY29ubmVjdGlvbnM6YXAtc291dGhlYXN0LTI6OTkxNjc5MTMxMDY4OmNvbm5lY3Rpb24vYzY0ZjAwMDItZTRmOS00MjhkLTgyMGYtMWY4ZTBjZGRhYWQ1J1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgY29tbWFuZHM6IFtcclxuICAgICAgICAgICAgICAgICducG0gY2knLFxyXG4gICAgICAgICAgICAgICAgJ25wbSBydW4gYnVpbGQnXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGJ1aWxkRW52aXJvbm1lbnQ6IHtcclxuICAgICAgICAgICAgICBidWlsZEltYWdlOiBjZGsuYXdzX2NvZGVidWlsZC5MaW51eEJ1aWxkSW1hZ2UuQU1BWk9OX0xJTlVYXzJfNCxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSxjb2RlQnVpbGREZWZhdWx0czoge1xyXG4gICAgICAgICAgICAgIHBhcnRpYWxCdWlsZFNwZWM6IGNkay5hd3NfY29kZWJ1aWxkLkJ1aWxkU3BlYy5mcm9tT2JqZWN0KHtcclxuICAgICAgICAgICAgICAgIGVudjp7XHJcbiAgICAgICAgICAgICAgICAgICdzaGVsbCc6J2Jhc2gnLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgcGhhc2VzOiB7XHJcbiAgICAgICAgICAgICAgICBpbnN0YWxsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJydW50aW1lLXZlcnNpb25zXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZWpzOiBcIjE2XCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG59Il19