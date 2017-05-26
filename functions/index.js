const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const pad2 = (n) => { return n < 10 ? '0' + n : n }

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

    var updates = {};
    updates['_updatedAt'] = now;

    // Only set _createdAt when it is first created.
    if (!event.data.previous.exists()) {
      updates['_createdAt'] = now;
    }

    return event.data.ref.parent.update(updates);
  });
