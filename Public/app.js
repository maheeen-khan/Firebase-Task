import { 
    app, auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword , signOut
} 
from './firebase.js'

//Auth//
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      const uid = user.uid;
      console.log("user exists", user);
    } else {
      // User is signed out
      console.log("user does not exist", user);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    //////Register///////////
    let registerBtn = document.getElementById('register');

    if (registerBtn) {
        let registerFunc = () => {
            let email = document.getElementById('email');
            let password = document.getElementById('password');

            createUserWithEmailAndPassword(auth, email.value, password.value)
                .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    console.log("User registered");
                    window.location.href = "./index.html";
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("User registration failed");
                    console.log(errorMessage);
                });
        };

        registerBtn.addEventListener('click', registerFunc);
    } else {
        console.error("Register button not found in the DOM.");
    }

    ///////Login/////////////
    let loginBtn = document.getElementById('login');

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            let loginEmail = document.getElementById('login-email');
            let loginPassword = document.getElementById('login-password');

            signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    alert("Login Successfully!");

                    setTimeout(() => {
                        window.location.href = "./home.html";
                    }, 3000);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                    // alert("Invalid Information!")
                });
        });
    } else {
        console.error("Login button not found in the DOM.");
    }
});


///////////////logout/////////////////
let logoutBtn = document.getElementById('logout');

logoutBtn.addEventListener('click', ()=>{

    signOut(auth).then(() => {
        console.log("User logged out successfully");
        // Swal.fire({
        //     title: "Logged Out!",
        //     text: "You have been logged out successfully.",
        //     icon: "success",
        //     confirmButtonText: "OK"
        // });
        alert("Log out Successfully!");
        window.location.href = "./index.html";

    })
    .catch((error) => {
        console.error("Logout failed", error);
        // Swal.fire({
        //     title: "Error",
        //     text: "An error occurred during logout.",
        //     icon: "error",
        //     confirmButtonText: "Try Again"
        // });
    });

});

let pass = document.getElementById('login-password').value;
let mail = document.getElementById('login-email').value;

let det = document.getElementById('getdetail')
let details = document.getElementById('details');

localStorage.setItem('password', pass);
localStorage.setItem('email', mail);

det.addEventListener('click', ()=>{
    details.innerHTML = `Email : ${localStorage.getItem(mail)} <br> Passowrd :  ${localStorage.getItem(pass)}`
    console.log('hi');
    
})