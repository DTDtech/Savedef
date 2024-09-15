import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

const signUserIn = async (authInstance) => {
    try {
        const authTokenProps = await chrome.identity.getAuthToken({ 'interactive': true });
        let credential = GoogleAuthProvider.credential(null, authTokenProps.token);
        await signInWithCredential(authInstance, credential);
    }
    catch (e) {
        throw new Error("Can't sign in: " + e);
    }
}

export default signUserIn;

