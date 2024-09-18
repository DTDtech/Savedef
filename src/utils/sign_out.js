import { signOut } from "firebase/auth";

const signUserOut = async (authInstance) => {
    try {
        await signOut(authInstance);
        chrome.storage.local.remove(["userName", "userEmail"]);
        chrome.identity.clearAllCachedAuthTokens();
    }
    catch (e) {
        throw new Error("Unable to sign in: " + e);
    }
}

export default signUserOut;