#!/usr/bin/env bash
set -e

export AWS_DEFAULT_REGION="${AWS_REGION:-ap-south-1}"

echo "Initializing LocalStack AWS resources for Aurora Stream in region ${AWS_DEFAULT_REGION}..."

# Create S3 Buckets
awslocal s3 mb s3://${AWS_S3_RAW_BUCKET:-aurora-raw-video}
awslocal s3 mb s3://${AWS_S3_PROCESSED_BUCKET:-aurora-processed-video}

# Create SQS Queue
awslocal sqs create-queue --queue-name ${AWS_SQS_TRANSCODE_QUEUE:-video-transcode-jobs}

# Create SNS Topic
awslocal sns create-topic --name ${AWS_SNS_USER_EVENTS_TOPIC:-user-events}

echo "LocalStack AWS resources initialization complete."
