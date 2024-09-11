import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

const createChat = async (currentUserId: string, otherUserId: string) => {
  const chatsRef = collection(db, "chats");
  const q = query(chatsRef, where("users", "array-contains", currentUserId));
  const existingChats = await getDocs(q);
  let chatId = null;
  existingChats.forEach((chat) => {
    const chatData = chat.data();
    if (chatData.users.includes(otherUserId)) {
      chatId = chat.id;
    }
  });
  if (!chatId) {
    const newChatDoc = await addDoc(chatsRef, {
      users: [currentUserId, otherUserId],
      createdAt: new Date(),
    });
    chatId = newChatDoc.id;
  }
  return chatId;
};

export default createChat;
