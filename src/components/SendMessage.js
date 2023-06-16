import React, { useState, useRef } from 'react'
import { auth, createUserDocument, database, firestore } from "../firebase"
import firebase from "firebase/compat/app";
import { useAuth } from "../contexts/AuthContext";

//import { Input, Button } from '@material-ui/core'

export default function SendMessage({ scroll }) {
    const [msg, setMsg] = useState('')
    const { currentUser, logout } = useAuth();
    const cEmail = currentUser.email;

    async function sendMessage(e) {
        e.preventDefault()
        const { uid } = auth.currentUser

        await firestore.collection('messages').add({
            text: msg,
            uid,
            cEmail,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMsg('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div>
            <form onSubmit={sendMessage}>
                <div className="sendMsg">
                    <input  placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                    <button  type="submit">Send</button>
                </div>
                
            </form>
        </div>
    )
}