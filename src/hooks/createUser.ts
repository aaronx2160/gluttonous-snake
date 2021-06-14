import {projectFirestore} from "../firebase/config";
import {useState,useEffect} from 'react'

// export const createUser= ()=> {
//     const firestoreRef = projectFirestore.collection('userInfo')
//     firestoreRef.add({username: 'player'}).then(async docRef => {
//             const id = docRef.id
//             let userName = 'Player-'+id.slice(0,5)
//             window.sessionStorage.setItem('username',userName)
//         })
// }

export const CreateUser =()=>{
    const [username, setUsername]=useState('')
    const firestoreRef = projectFirestore.collection('userInfo')

    useEffect(()=>{
        firestoreRef.add({username:'player'}).then((docRef)=>{
            const id =docRef.id
            let userName = 'Player-'+id.slice(0,5)
            setUsername(userName)
        })
    },[])

    return username
};

