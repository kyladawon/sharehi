// src/firebase.js
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

admin.initializeApp({
  credential: admin.credential.cert({
      type: process.env.FB_ADMIN_TYPE,
      project_id: process.env.FB_ADMIN_PROJECTID,
      private_key_id: process.env.FB_ADMIN_PK_ID,
      private_key: process.env.FB_ADMIN_PK_KEY.replace(/\\n/g, '\n'), 
      client_email: process.env.FB_ADMIN_CLIENTEMAIL,
      client_id: process.env.FB_ADMIN_CLIENTID,
      auth_uri: process.env.FB_ADMIN_AUTH_URL,
      token_uri: process.env.FB_ADMIN_AUTH_TOK,
      auth_provider_x509_cert_url: process.env.FB_ADMIN_AUTH_PROVIDER_URL,
      client_x509_cert_url: process.env.FB_ADMIN_CLIENT_CERT_URL,
  }) 
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Test Firebase Admin (Firestore)
async function testAdminFirestore() {
  try {
      const docRef = await admin.firestore().collection('adminTest').add({
          name: 'Admin Test',
          role: 'Admin',
      });
      console.log('Document written with ID (Admin SDK): ', docRef.id);
  } catch (error) {
      console.error('Error adding document with Admin SDK: ', error);
  }
}

// Test Firebase Client SDK (Auth and Firestore)
async function testClientSDK() {
  try {
      // Test Firestore
      const docRef = await addDoc(collection(db, 'clientTest'), {
          name: 'Client Test',
          role: 'User',
      });
      console.log('Document written with ID (Client SDK): ', docRef.id);

      // Test Authentication (Sign up a user)
      const userCredential = await auth.createUserWithEmailAndPassword('testuser@example.com', 'password123');
      console.log('User created with UID (Client SDK): ', userCredential.user.uid);

  } catch (error) {
      console.error('Error with Firebase Client SDK: ', error);
  }
}

// Run both tests
async function runTests() {
  console.log('Running Firebase Admin Firestore Test...');
  await testAdminFirestore();

  console.log('Running Firebase Client SDK Test...');
  await testClientSDK();
}

// Execute the test functions
runTests().catch(console.error);

export { app, auth, db, admin };