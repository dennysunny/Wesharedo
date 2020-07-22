import FirebaseKeys from './config';
import firebase from 'firebase';

class Fire {
    constructor(){
        firebase.initializeApp(FirebaseKeys)
    }

    addPost = async ({ text, localUri }) => {
        console.log("INSIDE ADD POST")
        var txt = text;
        console.log("VARR",txt)
        const remoteUri = await this.uploadPhotoAsync(localUri);
        console.log("INSIDE remote uri", remoteUri)
        return new Promise((res, rej) => {

            console.log("INSIDE PROMISE")
            console.log("DATAA text",text)
            console.log("DATAA uid",this.uid)
            console.log("DATAA remoteuri",remoteUri)

            this.firestore
                .collection("Posts")
                .add({
                    text: txt,
                    uid: this.uid,
                    timestamp: this.timestamp,
                    image: remoteUri
                })
                .then(ref => {
                    console.log("INSIDE then")
                    res(ref);
                })
                .catch(error => {
                    console.log("ERRORR")
                    rej(error);
                });
        });
    };

    uploadPhotoAsync = async uri => {
        const path = `photos/${this.uid}/${Date.now()}.jpg`;
        console.log("PATH",path)

        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();
            console.log("Filee is",file)
            
            let upload = firebase
                .storage()
                .ref(path)
                .put(file);

            console.log("UPLOADD",upload)
            upload.on(
                "state_changed",
                snapshot => {},
                err => {
                    console.log("Errorrrrr",err)
                    rej(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    console.log("RES URL",url)
                    res(url);
                }
            );
        });
    };

    get firestore() {
        return firebase.firestore();
    }

    get uid() {
        console.log("UIDDD",(firebase.auth().currentUser || {}).uid)
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return Date.now();
    }
}

Fire.shared = new Fire();
export default Fire;