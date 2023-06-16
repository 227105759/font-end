import React, { useState } from 'react'
import { storage, firestore } from '../firebase'
import firebase from "firebase/compat/app";

export default function NewPhoto({currentAlbum}) {
    const [file, setFile] = useState(null)

    const onFileChange = (e) =>{
        setFile(e.target.file[0])
    }

    const onUpload = async () => {
        const storageRef = storage.ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        firebase.collection("albums").doc(currentAlbum).update({
            images: firebase.firestore.FieldValue.arrayUnion({
                name: file.name,
                url: await fileRef.getDownloadURL()
            })
        })
        
    }
    return (
        <div>
            <input type="file" cnChange={onFileChange}/>
            <button onClick={onUpload}>Upload image</button>
        </div>
    )
}
