import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { storage, db } from "./firebase";

const UploadImage = async (file: File, userId: string): Promise<string> => {
  const date = new Date();
  const storageRef = ref(storage, `images/${date.getTime()}_${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise<string>((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Upload failed:", error);
        reject("Something went wrong! " + error?.code);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const userDocRef = doc(db, "users", userId);
          await updateDoc(userDocRef, { profileImage: downloadURL });
          resolve(downloadURL);
        } catch (error) {
          console.error("Failed to get download URL:", error);
          reject("Failed to get download URL!");
        }
      }
    );
  });
};

export default UploadImage;
