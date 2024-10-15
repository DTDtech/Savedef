import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

const signUserIn = async (authInstance, isInteractive) => {
    try {

        const redirectUri = chrome.identity.getRedirectURL();

        const oauthClientId = "238601540911-vnona7bpftpgqtsngibop1fje4gnvd4g.apps.googleusercontent.com";

        const oauthClientScopes = [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile"
        ]

        const authUrl = isInteractive ? `https://accounts.google.com/o/oauth2/auth?client_id=${oauthClientId}&response_type=token&scope=${encodeURIComponent(oauthClientScopes.join(" "))
            }&redirect_uri=${encodeURIComponent(redirectUri)
            }&prompt=select_account` : 
            `https://accounts.google.com/o/oauth2/auth?client_id=${oauthClientId}&response_type=token&scope=${encodeURIComponent(oauthClientScopes.join(" "))
            }&redirect_uri=${encodeURIComponent(redirectUri)}`;

        const timeBeforeAuthorization = Date.now();

        const responseUrl = await chrome.identity.launchWebAuthFlow(
            {
                'url': authUrl,
                'interactive': isInteractive
            }
        );

        if (chrome.runtime.lastError) {
            throw {
                name: "Webflow error",
                message: chrome.runtime.lastError + "."
            };
        }

        if (!responseUrl) {
            if (isInteractive === true) {
                throw {
                    name: "Authentication failed",
                    message: "You have canceled sign-in."
                };
            }
            else {
                throw {
                    name: "Authentication failed",
                    message: "No response URL was returned."
                };
            }
        }

        const params = new URLSearchParams(
            new URL(responseUrl).hash.slice(1)
        );

        const error = params.get("error");

        if (error) {
            throw {
                name: "Authorization response error",
                message: error + "."
            }
        }

        const token = params.get("access_token");

        if (!token) {
            throw {
                name: "Authorization response error",
                message: "No token was returned after sign-in."
            }
        }

        const expires_in = params.get("expires_in");

        if (!expires_in) {
            throw {
                name: "Authorization response error",
                message: "No expire time for access token was returned."
            }
        }

        //Convert expires_in from seconds to milliseconds
        chrome.storage.local.set({ "access_token_expiry_time": timeBeforeAuthorization + (expires_in * 1000) });

        chrome.storage.local.set({ "access_token": token });

        console.log(token);
        console.log(responseUrl);

        const credential = GoogleAuthProvider.credential(null, token);

        await signInWithCredential(authInstance, credential);

    }
    catch (error) {
        if (error.name === "Authentication failed" || "Webflow error" || "Authorization response error") {
            console.log(error);
            throw error;
        }

        console.log("Can't sign in: " + error);
        throw new Error("Can't sign in: " + error);
    }
}

export default signUserIn;

