const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addSoccerTeam = functions.https.onCall(async (data) => {
  const name = data.name;
  const foundationYear = data.foundationYear;

  if (!name || !foundationYear) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Name and foundationYear are required',
    );
  }

  const docRef = await admin.firestore().collection('teams').add({
    name,
    foundationYear,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { id: docRef.id };
});
