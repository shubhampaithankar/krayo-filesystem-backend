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
            console.log(err)
        })
})

router.get('/download', (req, res) => {

    const { fileName } = req.query

    const downloadURL = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${fileName}`
    res.status(200).send({
        url: downloadURL
    })

    // const params = {
    //     Bucket: process.env.AWS_BUCKET_NAME,
    //     Key: fileName
    // }

    // s3.getObject(params)
    //     .promise()
    //     .then(data => {
    //         res.status(200).send({
    //             data
    //         })
    //     })
    //     .catch(err => {
    //         res.status(500).send('Error Fetching File')
    //     })
})
module.exports = router