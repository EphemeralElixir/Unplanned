//Fill in and change name to Auth.js in production
module.exports = {
  'facebookAuth': {
    callbackURL: 'InsertCallbackURL',
    enableProof: true,
    clientID: 'InsertClientID',
    clientSecret: 'InsertClientSecret',
    profileFields: ['emails', 'first_name', 'last_name', 'picture', 'gender','name', 'displayName', 'photos']
  },
  'dbUri': 'InsertDatabaseUri'
};
