import * as React from 'react'
import './index.css'
import Background from "./components/Background";
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


import 'firebase/firestore';

import { useFirestore, useFirestoreCollectionData} from 'reactfire';

import {CreateUser} from "./hooks/createUser";


const GetHighestScore = () => {
    let highestScore = 0
    let highestLevel = 0
    const userName = window.sessionStorage.getItem('username')
    const userDataRef = useFirestore()
        .collection('gameData')
        .where('username', '==', userName)
    const {status, data} = useFirestoreCollectionData(userDataRef);
    if (status === 'success') {
        if (data.length === 1) {
            // @ts-ignore
            highestScore = data[0]['score']
            // @ts-ignore
            highestLevel = data[0]['level']
        } else {
            for (let i = 0; i < data.length - 1; i++) {
                // @ts-ignore
                highestScore = data[i]['score'] > data[i + 1]['score'] ? data[i]['score'] : data[i + 1]['score']
                // @ts-ignore
                highestLevel = data[i]['level'] > data[i + 1]['level'] ? data[i]['level'] : data[i + 1]['level']
            }
        }
    }
    return {maxScore: highestScore, maxLevel: highestLevel}
}

const App = () => {
    const userName = window.sessionStorage.getItem('username')
    const username = CreateUser()
    if (!userName) {
        window.sessionStorage.setItem('username', username)
    }
    const {maxScore, maxLevel} = GetHighestScore()
    return (

            <div className="App">
                <div>
                <div className='header'>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6">
                                Gluttonous Snake
                            </Typography>
                            <div className='chips'>
                                <Chip
                                    size="small"
                                    icon={<FaceIcon/>}
                                    label={userName ? userName : 'loading...'}
                                />
                                <Chip
                                    size="small"
                                    icon={<DoneIcon/>}
                                    label={`Highest score: ${maxScore ? maxScore : 0}`}
                                />
                                <Chip
                                    size="small"
                                    icon={<ChangeHistoryIcon/>}
                                    label={`Highest level: ${maxLevel ? maxLevel : 0}`}
                                />
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
            </div>
            <Background/>
        </div>

)
}


export default App
