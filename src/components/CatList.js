import React from "react";
import { useState, useEffect } from "react";
import { firestore, setDoc } from "../firebase";
import firebase from "firebase/compat/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



export default function CatList() {
  const [catInfo, setcatInfo] = useState({
    title: "",
    age: "",
  });
  const onChangeValue = (e) => {
    setcatInfo({
      ...catInfo,
      [e.target.name]: e.target.value,
    });
  };

  const [isUsers, setUsers] = useState([]);
  {
    /* Fetch ------------------------------------------- */
  }
  useEffect(() => {
    firestore.collection("favorite").onSnapshot((snapshot) => {
        setUsers(
          snapshot.docs.map((doc) => {
            return {
              //id: doc.id,
              title: doc.data().title,
              age: doc.data().age,
              //image: doc.data().images,
             //datetime: doc.data().datetime,
            };
          })
        );
      });
  }, []);
  //----------------------------------------------------------
  const [isfile, setFile] = useState(null);
  const handleImageAsFile = (e) => {
    setFile(e.target.files[0]);
  };

  {/* Insert ------------------------------------------- */}
  const addlist = async(event) => {
    try {
      event.preventDefault();
      let file = isfile;

      const storage = getStorage();
      var storagePath = 'uploads/' + file.name;

      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', (snapshot) => {
        // progrss function ....
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => { 
        // error function ....
        console.log(error);
      }, 
      () => {
        // complete function ....
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          firestore.collection('cats').add({
            title: catInfo.title,
            age: catInfo.age,
            images: downloadURL,
            datetime: firebase.firestore.FieldValue.serverTimestamp()
          })
          setcatInfo({
            ...catInfo,
              title:'',
          });
          setFile(null);
        });
      });
    } catch (error) { throw error;}  
  }

  //update
  const editList = async(id) =>{
    //console.log(id)
    firestore.collection('cats').doc(id).update({
      title: catInfo.title,
      age: catInfo.age
    }).then(() =>{
      //Toast.success('contact update success')
      console.log('success')
    }).catch(() =>{
      console.log('error')
    })
  }

  //delete
  const deletList = async(id) =>{
    firestore.collection('cats').doc(id).delete()
    .then(()=>{
      console.log('success')
    }).catch(() =>{
      console.log('error')
    })
  }

  return (<>
    <div className="App">
      <h1> Favorite Cat List </h1>
      {/* Fetch cats ------------------------------------------------*/}
      {isUsers.map((items,index) => (
        <div key={items.id} >
        <div className="wrapper__list">
          <p><b> Title : </b> {items.title}</p>
          <p><b> Age : </b> {items.age}</p>
          <img src={items.image} alt=""/>
          <button onClick={() =>deletList(items.id)}>Delete</button>
        </div>    
      </div>
      ))}
    </div>
  </>)
}
