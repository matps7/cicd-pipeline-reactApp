import * as cdk from 'aws-cdk-lib';
import { InfrastuctureStack } from '../lib/infrastructure-stack';
import { ReactPipelineStack } from '../lib/pipeline-react-stack';

const app = new cdk.App();

new ReactPipelineStack(app, 'MyPipelineStack', {
  env: {
    account: '991679131068',
    region: 'ap-southeast-2',
  }
});

new InfrastuctureStack(app, 'InfrastructureStack', {
  env: {
    account: '991679131068',
    region: 'ap-southeast-2',
  }
});

app.synth();