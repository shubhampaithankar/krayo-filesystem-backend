const { Router } = require('express')
const fs = require('fs')
const s3 = require('../modules/aws-sdk')

const router = Router()

router.post('/upload',(req, res) => {
    const file = req.files.file
    const fileContent  = Buffer.from(file.data, 'binary')
    const { id } = req.body

    const fileName = `${id}/${file.name}`

    const params = {
        Body: fileContent,
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName
    }

    s3.upload(params)
        .promise()
        .then(data => {
            res.status(200).send({
                data
            })
        })
        .catch(err => {
            res.status(500).send({
                message: `There was an error`
            })
        })
})

router.get('/get', (req, res) => {
    const { id } = req.query

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
    }

    s3.listObjects(params)
        .promise()
        .then(data => {
            const files = data.Contents.filter(file => file.Key.startsWith(id))
            res.status(200).send({
                files
            })
        })
        .catch(err => {
            res.status(500).send({
                message: `There was an error`
            })
        })
})

router.get('/download', (req, res) => {

    const { fileName } = req.query

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Expires: 3600,
        ResponseContentDisposition: `attachment; filename=${fileName.split('/')[1]}`
    }

    try {
        const url = s3.getSignedUrl('getObject', params)
        res.status(200).send({
            url
        })
    } catch (error) {
        res.status(500).send({
            message: `There was an error`
        })
    }
    
})
module.exports = router