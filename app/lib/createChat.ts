import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { getRoomId } from "../constants/common";

const createChat = async (currentUserId: string, otherUserId: string) => {
  const roomId = getRoomId(currentUserId, otherUserId);
  const chatDocRef = doc(db, "chats", roomId);
  const docSnapshot = await getDoc(chatDocRef);
  if (!docSnapshot.exists()) {
    await setDoc(chatDocRef, {
      users: [currentUserId, otherUserId],
      createdAt: new Date(),
    });
  }
  return roomId;
};

export default createChat;
