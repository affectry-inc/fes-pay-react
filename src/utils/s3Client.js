import AWS from 'aws-sdk'

let s3_client;

const s3 = () => {
  if (s3_client) return s3_client

  AWS.config.update({
    region: 'us-east-1',
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:77037c03-1409-4206-b041-05b9c4f1a7ea'
    })
  })

  s3_client = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: 'fespay-dev'}
  })

  return s3_client
}

const dataURLtoBlob = (dataurl, type) => {
  const bin = atob(dataurl.split("base64,")[1])
  const len = bin.length
  const barr = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    barr[i] = bin.charCodeAt(i)
  }
  return new Blob([barr], {
    type: type,
  })
}

const upload = (filename, filetype, localUrl, cbSuccess, cbError) => {
  const blob = dataURLtoBlob(localUrl, filetype)

  s3().upload(
    {Key: filename, ContentType: filetype, Body: blob, ACL: "public-read"},
    function(err, data){
      if (err) {
        console.log(err)
        cbError(err)
      } else {
        console.log(data)
        cbSuccess(data)
      }
    }
  )
}

module.exports = {
  upload,
}
