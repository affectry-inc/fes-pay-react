const axios = require('axios')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const pad2 = (n) => { return n < 10 ? '0' + n : n }

exports.registerCard = functions.database.ref('/bands/{bandId}/cardToken')
  .onCreate(event => {

    const bandId = event.params.bandId
    const cardToken = event.data.val()
    const sKey = functions.config().stripe.skey

    const data = 'description=' + bandId
      + '&source=' + cardToken

    const config = {
      headers: {
        'Authorization': 'Bearer ' + sKey,
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }

    axios.post(
      'https://api.stripe.com/v1/customers',
      data,
      config
    )
    .then(function (res) {
      let updates = {}
      updates['cardCustomerId'] = res.data.id
      updates['cardToken'] = null

      return event.data.ref.parent.update(updates)
    })
    .catch(function (err) {
      console.log('ERROR Register card', err)
      return
    })
  })

// Listens for new data added to /faces/:pushId/photoUrl
// and sets _createdAt and _updatedAt
exports.timestampFaces = functions.database.ref('/faces/{pushId}/photoUrl')
  .onWrite(event => {

    // Exit when the data is deleted.
    if (!event.data.exists()) {
      return;
    }

    const d = new Date();

    const now =
      [
        d.getUTCFullYear().toString(),
        pad2(d.getUTCMonth() + 1),
        pad2(d.getUTCDate())
      ].join('-')
      + ' ' +
      [
        pad2(d.getUTCHours()),
        pad2(d.getUTCMinutes()),
        pad2(d.getUTCSeconds())
      ].join(':')
      + '.' + d.getUTCMilliseconds() + ' GMT';

    let updates = {};
    updates['_updatedAt'] = now;

    // Only set _createdAt when it is first created.
    if (!event.data.previous.exists()) {
      updates['_createdAt'] = now;
    }

    return event.data.ref.parent.update(updates);
  });
