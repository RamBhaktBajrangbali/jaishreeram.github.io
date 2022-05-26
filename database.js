import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, getDocs} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import {LOGIN, LOGOUT} from "./authentication.js"

var config = {
	apiKey: "AIzaSyCdzbcpM_Oe3NQgBmpJcJJq1cs0z5VFWYc",
  	authDomain: "fir-web-login-906b6.firebaseapp.com",
  	projectId: "fir-web-login-906b6",
  	storageBucket: "fir-web-login-906b6.appspot.com",
  	messagingSenderId: "1014146452701",
  	appId: "1:1014146452701:web:39150ab67e871555db1f34",
  	measurementId: "G-X24EJNJLQV"
};

firebase.initializeApp(config);
const app = initializeApp(config);
export const db = getFirestore(app);

export async function getvideos(db) {

  	const usersCol = collection(db, 'collection');
  	const userSnapshot = await getDocs(usersCol);
  	const objects = userSnapshot.docs.map(doc => doc.data());
	const n = objects.length;
  	
	for(var i = 0; i < n; i++){
	
		const object = objects[i];
	
		if(Object.keys(object).length === 0){
			continue;
		}

		const name = object["name"];
		const link = object["link"];
		const description = object["description"];
		const slides = object["slides"]

		document.querySelector("#user_div").insertAdjacentHTML('afterbegin', `
		<div style="width: 70%;">

			<span style="display:flex; justify-content: space-between;">
				<h3>${name}</h3>
				<h3><a href="${slides}" target = "blank">Class Slides</a></h3>
			</span>

			<p id = "description">${description}</p>

			<hr style="color: white;">

			<video style="border-radius: 5px;object-fit: cover;" width="100%" height="500" controls controlsList="nodownload" poster = "banner1.png">
				<source src="${link}" type="video/mp4">
				Your browser does not support the video tag.
			</video>		

			<br> <br>
			
		</div>
		`);
	}
	document.getElementById("loading").style.display = "none"
}

export async function exists(userid){

	const usersCol = collection(db, 'users');
	const userSnapshot = await getDocs(usersCol);
	const objects = userSnapshot.docs.map(doc => doc.data());
	const n = objects.length;
	var found = false;
	
	for(var i = 0; i < n;i++){
		if(objects[i].email == userid){
			found = true;
			break;
		}
	}
	
	return await found;
}

function login(){ LOGIN(); }
function logout(){ LOGOUT() }

window.logout = logout;
window.login = login;

document.addEventListener('contextmenu', event => event.preventDefault());