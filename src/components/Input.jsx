import React, { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { v4 as uuid} from "uuid";
import { db } from "../firebase";
const Input = () =>{
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    
    const handleSend = async () => {
        if (img) {
            const formData = new FormData();
            formData.append("file", img);
            formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

            try {
                const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                    method: "POST",
                    body: formData,
                });
                const dataResponse = await response.json();
                const downloadURL = dataResponse.secure_url;

                await updateDoc(doc(db, "chats", data.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                        img: downloadURL,
                    }),
                });
            } catch (err) {
                console.log(err);
            }
        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [`${data.chatId}.lastMessage`]: {
                text: img ? "Shared a photo" : text
            },
            [`${data.chatId}.date`]: serverTimestamp()
        });
        await updateDoc(doc(db, "userChats", data.user.uid), {
            [`${data.chatId}.lastMessage`]: {
                text: img ? "Shared a photo" : text
            },
            [`${data.chatId}.date`]: serverTimestamp()
        });

        setText("");
        setImg(null);
    };

    return (
        <div className="input">
            <div className="typeinput">
                <input type="text"  placeholder="Type anything" onChange={e=>setText(e.target.value)}
                value={text}/>
            </div>    
            <div className="send">
                <input style={{display:'none'}} type="file" id="file" onChange={e=>setImg(e.target.files[0])} />
                <label htmlFor="file">
                    <img className="icon" src="https://cdn-icons-png.flaticon.com/512/9187/9187554.png" alt="" />
                </label>
                <button onClick={handleSend}>
                    <img src="https://cdn-icons-png.flaticon.com/128/561/561226.png"/>
                </button>
            </div>
            
        </div>
    );
}
export default Input;