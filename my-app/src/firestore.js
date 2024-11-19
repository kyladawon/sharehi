import { db } from "./firebase.js"; // Adjust path if firebase.js is in a different folder
import { addDoc, collection } from "firebase/firestore";  // Add this import statement


// Example function to add a document to Firestore
async function saveFileMetadata(fileName, fileUrl) {
    try {
      const docRef = await addDoc(collection(db, "files"), {
        name: fileName,
        url: fileUrl, // Assuming you get this URL after storing the file elsewhere
        uploadedAt: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  export { saveFileMetadata };