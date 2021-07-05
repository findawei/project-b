const admin = require('firebase-admin');
// const serviceAccount = require('../serviceAccount.json');
const config =require( '../config');

const {private_key, client_email, project_id} = config;


admin.initializeApp({
  credential: admin.credential.cert({
    "project_id": project_id,
    "private_key": private_key.replace(/\\n/g, '\n'),
    "client_email": client_email,
  }),
  databaseURL: "https://nowaitlist-7f026.firebaseio.com"
});

async function decodeIDToken(req, res, next) {
  const header = req.headers.authorization;
  if (header !== 'Bearer null' && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
  const idToken = req.headers.authorization.split('Bearer ')[1];

  try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);

      req['currentUser'] = decodedToken;
      // console.log(
      // `decodeID username: ${decodedToken.name}`
      // )

  } catch (error) {
    res.status(error.response)
    return res.send(error.message);    
  }
  }
next();
}

module.exports = decodeIDToken;