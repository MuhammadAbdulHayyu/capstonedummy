const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://capstonesiph-d4637.firebasestorage.app", // ⚠️ pastikan ini benar
});

const bucket = admin.storage().bucket();
const folder = "pelanggaran/";

async function checkMetadata() {
  const [files] = await bucket.getFiles({ prefix: folder });

  for (const file of files) {
    const [metadata] = await file.getMetadata();

    console.log(`📄 ${file.name}`);
    console.log(`📦 contentDisposition: ${metadata.contentDisposition}`);
    console.log("───────");
  }
}

checkMetadata();
