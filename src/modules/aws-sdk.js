const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const s3 = new AWS.S3({
    params: { Bucket: process.env.AWS_BUCKET_NAME },
    region: process.env.AWS_BUCKET_REGION,
})

module.exports = s3