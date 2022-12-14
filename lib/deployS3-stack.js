"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeployStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const s3 = require("aws-cdk-lib/aws-s3");
const s3Deploy = require("aws-cdk-lib/aws-s3-deployment");
// todo: this could probably be split into smaller constructs as it's getting fairly big
class DeployStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Frontend
        const bucket = new s3.Bucket(this, 'FrontendReactBucket', {
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
            encryption: s3.BucketEncryption.S3_MANAGED,
        });
        // Frontend code and assets deployment
        new s3Deploy.BucketDeployment(this, 'DeployFrontend', {
            sources: [s3Deploy.Source.asset('reactwebapp/build')],
            destinationBucket: bucket,
        });
        // todo: add outputs for things like full domain name / url
    }
}
exports.DeployStack = DeployStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95UzMtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXBsb3lTMy1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBbUQ7QUFHbkQseUNBQXlDO0FBQ3pDLDBEQUEwRDtBQUUxRCx3RkFBd0Y7QUFDeEYsTUFBYSxXQUFZLFNBQVEsbUJBQUs7SUFDcEMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixXQUFXO1FBQ1gsTUFBTSxNQUFNLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxxQkFBcUIsRUFBRTtZQUN4RCxhQUFhLEVBQUUsMkJBQWEsQ0FBQyxPQUFPO1lBQ3BDLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsVUFBVSxFQUFFLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVO1NBSTNDLENBQUMsQ0FBQztRQUNILHNDQUFzQztRQUN0QyxJQUFJLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDcEQsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNyRCxpQkFBaUIsRUFBRSxNQUFNO1NBRTFCLENBQUMsQ0FBQztRQUVILDJEQUEyRDtJQUM3RCxDQUFDO0NBQ0Y7QUF0QkQsa0NBc0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhY2ssIFJlbW92YWxQb2xpY3kgfSBmcm9tICdhd3MtY2RrLWxpYic7XHJcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XHJcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xyXG5pbXBvcnQgKiBhcyBzMyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtczMnO1xyXG5pbXBvcnQgKiBhcyBzM0RlcGxveSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtczMtZGVwbG95bWVudCc7XHJcblxyXG4vLyB0b2RvOiB0aGlzIGNvdWxkIHByb2JhYmx5IGJlIHNwbGl0IGludG8gc21hbGxlciBjb25zdHJ1Y3RzIGFzIGl0J3MgZ2V0dGluZyBmYWlybHkgYmlnXHJcbmV4cG9ydCBjbGFzcyBEZXBsb3lTdGFjayBleHRlbmRzIFN0YWNrIHtcclxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XHJcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcclxuXHJcbiAgICAvLyBGcm9udGVuZFxyXG4gICAgY29uc3QgYnVja2V0ID0gbmV3IHMzLkJ1Y2tldCh0aGlzLCAnRnJvbnRlbmRSZWFjdEJ1Y2tldCcsIHtcclxuICAgICAgcmVtb3ZhbFBvbGljeTogUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLCAvLyBhbGwgb2JqZWN0cyBjYW4gYmUgcmVzdG9yZWQgZnJvbSBjb2RlXHJcbiAgICAgIGF1dG9EZWxldGVPYmplY3RzOiB0cnVlLFxyXG4gICAgICBlbmNyeXB0aW9uOiBzMy5CdWNrZXRFbmNyeXB0aW9uLlMzX01BTkFHRUQsXHJcbiAgICAgIC8vIENvdWxkbid0IGdldCBlcnJvciBwYWdlIHJlZGlyZWN0aW9uIHRvIHdvcmsgd2l0aCBjbG91ZGZyb250LlxyXG4gICAgICAvLyBJIHRoaW5rIHRoYXQgbmVlZHMgcHVibGljIHBlcm1pc3Npb25zIHRvIHdvcmssIG5vdCBqdXN0IG9yaWdpbmFsIGFjY2VzcyBpZGVudGl0eSBwZXJtaXNzaW9uLFxyXG4gICAgICAvLyBzbyBkb2luZyBlcnJvciBwYWdlIHJlZGlyZWN0aW9uIGluIGNsb3VkZnJvbnQgaW5zdGVhZC5cclxuICAgIH0pO1xyXG4gICAgLy8gRnJvbnRlbmQgY29kZSBhbmQgYXNzZXRzIGRlcGxveW1lbnRcclxuICAgIG5ldyBzM0RlcGxveS5CdWNrZXREZXBsb3ltZW50KHRoaXMsICdEZXBsb3lGcm9udGVuZCcsIHtcclxuICAgICAgc291cmNlczogW3MzRGVwbG95LlNvdXJjZS5hc3NldCgncmVhY3R3ZWJhcHAvYnVpbGQnKV0sXHJcbiAgICAgIGRlc3RpbmF0aW9uQnVja2V0OiBidWNrZXQsXHJcbiAgICAgIC8vIGVuc3VyZXMgY2xvdWRmcm9udCBjYWNoZSBpbnZhbGlkYXRpb24gb24gZGVwbG95OlxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gdG9kbzogYWRkIG91dHB1dHMgZm9yIHRoaW5ncyBsaWtlIGZ1bGwgZG9tYWluIG5hbWUgLyB1cmxcclxuICB9XHJcbn1cclxuIl19