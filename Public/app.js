import { 
    app, auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword , signOut,  GoogleAuthProvider,
    provider, signInWithPopup
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

     if(registerBtn){
    try {
        let registerFunc = () => {
            let email = document.getElementById('email');
            let password = document.getElementById('password');

            createUserWithEmailAndPassword(auth, email.value, password.value)
                .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    console.log("User registered");
                    // alert("User registered");

                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Registration Successful!",
                        text: 'Thank you for registering. Welcome aboard!',
                        showConfirmButton: false,
                        timer: 2000
                      });

                     setTimeout(() => {
                        window.location.href = "./index.html";
                    }, 2000);

                   
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("User registration failed");
                    console.log(errorMessage);
                });
        };

        registerBtn.addEventListener('click', registerFunc);
    } catch(e) {
        console.error("Register button not found in the DOM.", e);
    }
     }
    ///////Login/////////////
    let loginBtn = document.getElementById('login');

    if(loginBtn){
    try {
        
        loginBtn.addEventListener("click", () => {
            let loginEmail = document.getElementById('login-email');
            let loginPassword = document.getElementById('login-password');

            signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    // alert("Login Successfully!");
                   
                    Swal.fire({
                        title: "Login Successfully!",
                        showClass: {
                          popup: `
                            animate__animated
                            animate__fadeInUp
                            animate__faster
                          `
                        },
                        hideClass: {
                          popup: `
                            animate__animated
                            animate__fadeOutDown
                            animate__faster
                          `
                        }
                      });

                    localStorage.setItem('name',loginEmail.value)

                    setTimeout(() => {
                        window.location.href = "./home.html";
                    }, 2000);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                    // alert("Invalid Information!")
                });
        });
    } catch(e) {
        console.error("Login button not found in the DOM.", e);
    }
}
});


///////////////logout/////////////////
let logoutBtn = document.getElementById('logout');
if(logoutBtn){
logoutBtn.addEventListener('click', ()=>{

    signOut(auth).then(() => {
        console.log("User logged out successfully");
      
        // alert("Log out Successfully!");
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log me out!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: 'Logged Out',
                text: "You have been logged out.",
                icon: "success",

              });
            }
            setTimeout(()=>{
                window.location.href = "./index.html";
            }, 3000)
            
          });
          
        

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
}

let googleBtn = document.getElementById('google');

if(googleBtn){
googleBtn.addEventListener('click', ()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log(errorMessage)
    alert(errorMessage);

    const email = error.customData.email;
   
    const credential = GoogleAuthProvider.credentialFromError(error);
    
  });

})
}