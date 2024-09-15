import { signOut } from "firebase/auth";

const signUserOut = async (authInstance) => {
    try {
        await signOut(authInstance);
        chrome.storage.local.remove(["userName", "userEmail"]);
    }
    catch (e) {
        throw new Error("Unable to sign in: " + e);
    }
}

export default signUserOut;