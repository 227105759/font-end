import React, { useState, useEffect, useRef } from 'react'
import { auth, createUserDocument, database, firestore } from "../firebase"
import firebase from "firebase/compat/app";
import SendMessage from './SendMessage.js'



export default function Chat() {
    const scroll = useRef()
    const [messages, setMessages] = useState([])
    useEffect(() => {
        firestore.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])
    return (
        <div>
            <div className="msgs">
                {messages.map(({ id, text, cEmail, uid }) => (
                    <div>
                        <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                            <p>{cEmail}</p>
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
        </div>
    )
}