import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { LOGIN, LOGOUT } from "./authentication.js";

var config = {
    apiKey: "AIzaSyCdzbcpM_Oe3NQgBmpJcJJq1cs0z5VFWYc",
    authDomain: "fir-web-login-906b6.firebaseapp.com",
    projectId: "fir-web-login-906b6",
    storageBucket: "fir-web-login-906b6.appspot.com",
    messagingSenderId: "1014146452701",
    appId: "1:1014146452701:web:39150ab67e871555db1f34",
    measurementId: "G-X24EJNJLQV",
};

firebase.initializeApp(config);
const app = initializeApp(config);
export const db = getFirestore(app);
emailjs.init("YsZMJVNHGMAf25deJ");

function like() {
    swal("You Liked the Lecture", "Aww Yiss! Thanks for liking the lecture! \n\n Liking lectures motivates us to bring up\n such content for all of you!", "love.png");
}

export async function getvideos(db) {
    const usersCol = collection(db, "collection");
    const userSnapshot = await getDocs(usersCol);
    const objects = userSnapshot.docs.map((doc) => doc.data());
    const n = objects.length;

    for (var i = 0; i < n; i++) {
        const object = objects[i];

        if (Object.keys(object).length === 0) {
            continue;
        }

        const name = object["name"];
        const link = object["link"];
        const description = object["description"];
        const slides = object["slides"];

        document.querySelector("#user_div").insertAdjacentHTML(
            "afterbegin",
            `
            <div>
				<video controls width = "100%" height="700" poster="banner.png" style="object-fit: cover;" controlsList="nodownload">
					<source src="${link}"/>
				</video>
				<span class="title">
					<span style="width:50%;">
						<h3>${name}</h3>
					</span>
					<button class="like" id = "liked" onclick="like()">Like</button>
				</span>

				<span style="width: 70%;" class="description">
					<p>${description}</p>
					<h4>View class slides <a href = "${slides}">here</a>.</h4>
				</span>
            </div>
            <hr class="end">
		`
        );
    }
    document.getElementById("loading").style.display = "none";
}

export async function exists(userid) {
    const usersCol = collection(db, "users");
    const userSnapshot = await getDocs(usersCol);
    const objects = userSnapshot.docs.map((doc) => doc.data());
    const n = objects.length;
    var found = false;

    for (var i = 0; i < n; i++) {
        if (objects[i].email == userid) {
            found = true;
            break;
        }
    }

    return await found;
}

async function viewDailyTasks() {
    const div = document.createElement("span");
    div.className = "TASK";
    const usersCol = collection(db, "dailytasks");
    const userSnapshot = await getDocs(usersCol);
    const objects = userSnapshot.docs.map((doc) => doc.data());
    const n = objects.length;
    for (var i = 0; i < n; i++) {
        const object = objects[i];
        if (Object.keys(object).length === 0) {
            continue;
        }
        div.insertAdjacentHTML(
            "afterbegin",
            `
			<span style="margin:0 !important">
				<h3>${object.date} - <a href = "${object.task}" target = "blank">Problem</a></h3>
			</span>
		`
        );
    }
    swal({
        title: "Daily Tasks",
        content: div,
        className: "swalTasksModal",
    });
}

const form = document.getElementById("contactus")

function sendMessage(){
    const name = document.getElementById("sendername").value;
    const email = document.getElementById("senderemail").value;
    const message = document.getElementById("sendermessage").value;
    const subject = document.getElementById("sendersubject").value;
    emailjs.send("service_45jp3cc","template_xx6wpjl",{
        name: name,
        email: email,
        message: message,
        subject: subject
    })
    .then( () => {
        swal("Message Sent Successfully", "", "success.png");
        form.reset()
    })
    .catch( () => {
        swal("Message Submission Failed", "Please try again.", "error.png");
    })
}

function login() {
    LOGIN();
}
function logout() {
    LOGOUT();
}

function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

window.logout = logout;
window.login = login;
window.viewDailyTasks = viewDailyTasks;
window.like = like;
window.sendMessage = sendMessage

document.addEventListener("contextmenu", (event) => event.preventDefault());
