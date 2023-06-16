import React, { useState, useRef } from 'react'
import { auth, createUserDocument, database, firestore } from "../firebase"
import firebase from "firebase/compat/app";
import { useAuth } from "../contexts/AuthContext";
import { Button,Input } from '@mui/material';

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
                <Input style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                <Button style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}} type="submit">Send</Button>
                </div>
                
            </form>
        </div>
    )
}