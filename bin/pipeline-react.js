"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("aws-cdk-lib");
const pipeline_react_stack_1 = require("../lib/pipeline-react-stack");
const infrastructure_stack_1 = require("../lib/infrastructure-stack");
const app = new cdk.App();
new pipeline_react_stack_1.ReactPipelineStack(app, 'MyPipelineStack', {
    env: {
        account: '991679131068',
        region: 'ap-southeast-2',
    }
});
new infrastructure_stack_1.InfrastuctureStack(app, 'InfrastructureStack', {
    env: {
        account: '991679131068',
        region: 'ap-southeast-2',
    }
});
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtcmVhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1yZWFjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFtQztBQUNuQyxzRUFBaUU7QUFDakUsc0VBQWlFO0FBRWpFLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBRTFCLElBQUkseUNBQWtCLENBQUMsR0FBRyxFQUFFLGlCQUFpQixFQUFFO0lBQzdDLEdBQUcsRUFBRTtRQUNILE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLE1BQU0sRUFBRSxnQkFBZ0I7S0FDekI7Q0FDRixDQUFDLENBQUM7QUFDSCxJQUFJLHlDQUFrQixDQUFDLEdBQUcsRUFBRSxxQkFBcUIsRUFBRTtJQUNqRCxHQUFHLEVBQUU7UUFDSCxPQUFPLEVBQUUsY0FBYztRQUN2QixNQUFNLEVBQUUsZ0JBQWdCO0tBQ3pCO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcclxuaW1wb3J0IHsgUmVhY3RQaXBlbGluZVN0YWNrIH0gZnJvbSAnLi4vbGliL3BpcGVsaW5lLXJlYWN0LXN0YWNrJztcclxuaW1wb3J0IHsgSW5mcmFzdHVjdHVyZVN0YWNrIH0gZnJvbSAnLi4vbGliL2luZnJhc3RydWN0dXJlLXN0YWNrJztcclxuXHJcbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XHJcblxyXG5uZXcgUmVhY3RQaXBlbGluZVN0YWNrKGFwcCwgJ015UGlwZWxpbmVTdGFjaycsIHtcclxuICBlbnY6IHtcclxuICAgIGFjY291bnQ6ICc5OTE2NzkxMzEwNjgnLFxyXG4gICAgcmVnaW9uOiAnYXAtc291dGhlYXN0LTInLFxyXG4gIH1cclxufSk7XHJcbm5ldyBJbmZyYXN0dWN0dXJlU3RhY2soYXBwLCAnSW5mcmFzdHJ1Y3R1cmVTdGFjaycsIHtcclxuICBlbnY6IHtcclxuICAgIGFjY291bnQ6ICc5OTE2NzkxMzEwNjgnLFxyXG4gICAgcmVnaW9uOiAnYXAtc291dGhlYXN0LTInLFxyXG4gIH1cclxufSk7XHJcblxyXG5hcHAuc3ludGgoKTsiXX0=