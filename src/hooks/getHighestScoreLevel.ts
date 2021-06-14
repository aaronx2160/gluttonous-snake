import {useFirestore, useFirestoreCollectionData} from "reactfire";

export const GetHighestScore = () => {
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
