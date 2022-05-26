import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAuth ,GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import {exists, getvideos, db} from "./database.js"

const config = {
  apiKey: "AIzaSyCdzbcpM_Oe3NQgBmpJcJJq1cs0z5VFWYc",
    authDomain: "fir-web-login-906b6.firebaseapp.com",
    projectId: "fir-web-login-906b6",
    storageBucket: "fir-web-login-906b6.appspot.com",
    messagingSenderId: "1014146452701",
    appId: "1:1014146452701:web:39150ab67e871555db1f34",
    measurementId: "G-X24EJNJLQV"
};

const app = initializeApp(config);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);

getAuth().onAuthStateChanged(function(user) {
	if (user) {

        document.getElementById("login_div").style.display = "block";
        
        (async () => {

            const find = await exists(user.email);
            if(find === false){
                swal(
                    "Authenticaion Failure",
                    "Your account is not verified, \n please contact server owner to get your account verified.",
                    "error"
                )
                return;
            }

            else{
                swal(
                    "Successfully Logged In",
                    `Welcome ${user.displayName} !`,
                    "success"
                )
                document.getElementById("navbar_1").style.display = "block";
                document.getElementById("user_div").style.display = "block";
                document.getElementById("login_div").style.display = "none";
                getvideos(db);
            }

        })()

  	} 
    else {
        // No user is signed in.
        document.getElementById("navbar_1").style.display = "none"
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
    }
});

export function LOGIN(){
    signInWithPopup(auth, provider).then((result) => {}).catch((error) => {});
};


export function LOGOUT(){
    signOut(auth).then(() => {}).catch((error) => {});
}
