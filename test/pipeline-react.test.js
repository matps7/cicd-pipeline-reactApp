"use strict";
/* import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import * as PipelineReact from '../lib/pipeline-react-stack';

test('SQS Queue and SNS Topic Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new PipelineReact.PipelineReactStack(app, 'MyTestStack');
  // THEN

  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::SQS::Queue', {
    VisibilityTimeout: 300
  });
  template.resourceCountIs('AWS::SNS::Topic', 1);
}); */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtcmVhY3QudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBpcGVsaW5lLXJlYWN0LnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O01BZ0JNIiwic291cmNlc0NvbnRlbnQiOlsiLyogaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcclxuaW1wb3J0IHsgVGVtcGxhdGUsIE1hdGNoIH0gZnJvbSAnYXdzLWNkay1saWIvYXNzZXJ0aW9ucyc7XHJcbmltcG9ydCAqIGFzIFBpcGVsaW5lUmVhY3QgZnJvbSAnLi4vbGliL3BpcGVsaW5lLXJlYWN0LXN0YWNrJztcclxuXHJcbnRlc3QoJ1NRUyBRdWV1ZSBhbmQgU05TIFRvcGljIENyZWF0ZWQnLCAoKSA9PiB7XHJcbiAgY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcclxuICAvLyBXSEVOXHJcbiAgY29uc3Qgc3RhY2sgPSBuZXcgUGlwZWxpbmVSZWFjdC5QaXBlbGluZVJlYWN0U3RhY2soYXBwLCAnTXlUZXN0U3RhY2snKTtcclxuICAvLyBUSEVOXHJcblxyXG4gIGNvbnN0IHRlbXBsYXRlID0gVGVtcGxhdGUuZnJvbVN0YWNrKHN0YWNrKTtcclxuXHJcbiAgdGVtcGxhdGUuaGFzUmVzb3VyY2VQcm9wZXJ0aWVzKCdBV1M6OlNRUzo6UXVldWUnLCB7XHJcbiAgICBWaXNpYmlsaXR5VGltZW91dDogMzAwXHJcbiAgfSk7XHJcbiAgdGVtcGxhdGUucmVzb3VyY2VDb3VudElzKCdBV1M6OlNOUzo6VG9waWMnLCAxKTtcclxufSk7ICovXHJcbiJdfQ==