import firebase from 'firebase';
import { ref
    // , firebaseAuth
} from '../config/constants'

export function saveNewAirdrop (airdropID, airdropName) {
    return ref.child(`airdrops/${airdropID}`)
        .set({
            airdrop_id: airdropID,
            airdrop_name: airdropName,
            airdropDeployed: false
        })
}

export function getAirdrops () {
    return new Promise((resolve, reject) => {
        firebase.database().ref('airdrops').on('value', (snapshot) => {
            let result = snapshot.val()
            resolve (
                result
            )
        }, (errorObject) => {
            console.log("The read failed: " + errorObject.code)
        })
    })
}


