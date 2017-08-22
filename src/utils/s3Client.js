import AWS from 'aws-sdk'

let s3_client;

const s3 = () => {
  if (s3_client) return s3_client

  AWS.config.update({
    region: process.env.REACT_APP_AWS_REGION,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID
    })
  })

  s3_client = new AWS.S3({
    apiVersion: process.env.REACT_APP_S3_API_VERSION,
    params: {Bucket: process.env.REACT_APP_S3_BUCKET}
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
