const Express = require('express');
const multer =require('multer');
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = Express();
app.use(bodyParser.json());
const Storage =  multerS3({
    s3: new aws.S3(),
    bucket:'jcconsultoria',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl:'public-read',
    key: (req, file, callback) => {
        crypto.randomBytes(16, (err, hash) => {
            if(err) callback(err);
            const fileName = `${hash.toString('hex')}-${file.originalname}`;
            callback(null, fileName);
            console.log("-----------------------------AGR--------------------------")
            console.log(req)
            console.log("-----------------------------AGR--------------------------")
        });
    },        
});
const upload = multer({ storage: Storage }).array("imgUploader", 3);




module.exports = app => {
//-----------------------------------------------------------------------------------------
const saveUplouds = (req, res) => {  
    console.log(JSON.stringify("req.body.data"))  
}
//------------------------------------------------------------------------------------------------------
return { saveUplouds }
}
//--