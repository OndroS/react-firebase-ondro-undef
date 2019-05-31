import firebase from 'firebase';
import { ref
    // , firebaseAuth
} from '../config/constants'

export function saveNewImport (airdropID, airdropData) {
    return ref.child(`airdrops/${airdropID}/airdrop_imported_data`)
        .set({
            airdrop_data: airdropData
        })
}

export function getAirdropData (airdropID) {
    return new Promise((resolve, reject) => {
        firebase.database().ref(`airdrops/${airdropID}`).on('value', (snapshot) => {
            let result = snapshot.val()
            resolve (
                result
            )
        }, (errorObject) => {
            console.log("The read failed: " + errorObject.code)
        })
    })
}