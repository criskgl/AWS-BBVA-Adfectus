const AWS = require('aws-sdk');
const S3Custom = require ('aws-s3');

const s3BucketName = "panteras-patterns-audio-analyzer";
const dynamoDBTable = "adfectus-app-ResultsDDBtable-173Z6YX4MFTGZ";
const dynamoDBTableID = "partitionKey";

AWS.config.update({ 
  "accessKeyId":  "AKIAXGNZYS5A2Q3M5AG4", 
  "secretAccessKey": "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", 
  "region": "us-west-2" 
});


//var s3 = new AWS.S3();

var dbDocClient = new AWS.DynamoDB.DocumentClient();


function uploadToS3(file){
  const config = {
    bucketName: s3BucketName,
    region: 'us-west-2',
    accessKeyId: 'AKIAXGNZYS5A2Q3M5AG4',
    secretAccessKey: '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'
  }
  
  const fileNameNoExtension = file.name.substr(0, file.name.lastIndexOf('.')) || file.name ;
  const S3Client = new S3Custom(config);
  return S3Client.uploadFile(file, fileNameNoExtension)
}

async function getAllResults() {
    const result = await dbDocClient.scan({ 
      TableName: dynamoDBTable
    }).promise();
    return result;   
}

async function getResultItem(key) {
    let customKey = {};
    customKey[dynamoDBTableID] = key;
    return dbDocClient.get({
        TableName: dynamoDBTable,
        Key: customKey
    }).promise();  
}

module.exports = {
    getAllResults,
    getResultItem,
    uploadToS3
}