import {
  app, auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup, provider, GoogleAuthProvider, deleteUser
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
    } catch (e) {
      console.error("Register button not found in the DOM.", e);
    }
  }
  ///////Login/////////////
  let loginBtn = document.getElementById('login');

  if (loginBtn) {
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

            localStorage.setItem('name', loginEmail.value)

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
    } catch (e) {
      console.error("Login button not found in the DOM.", e);
    }
  }
});


///////////////logout/////////////////
let logoutBtn = document.getElementById('logout');

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      // Only log out if the user confirmed
      if (result.isConfirmed) {
        signOut(auth)
          .then(() => {
            Swal.fire({
              title: 'Logged Out',
              text: "You have been logged out.",
              icon: "success",
              showConfirmButton: false,
              timer: 2000
            });

            setTimeout(() => {
              window.location.href = "./index.html";
            }, 2000); // Redirect after showing success message
          })
          .catch((error) => {
            console.error("Logout failed", error);
            Swal.fire({
              title: "Error",
              text: "An error occurred during logout. Please try again.",
              icon: "error",
              confirmButtonText: "OK"
            });
          });
      }
    });
  });
}

//////////Delete account (de-activate account)

let deActivateBtn = document.getElementById('deactive');
deActivateBtn.addEventListener('click', ()=>{


  const user = auth.currentUser;
  
  if (user) {
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete my account",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete the user
        deleteUser(user)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your account has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 2000
            });

            setTimeout(() => {
              window.location.href = "./register.html"; // Redirect after deletion
            }, 2000);
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            Swal.fire({
              title: "Error",
              text: "There was an error deleting your account. Please try again.",
              icon: "error",
              confirmButtonText: "OK"
            });
          });
      }
    });
  } else {
    console.log("No user is signed in.");
  }
})



/////google authentication


let googleBtn = document.getElementById('google');

document.addEventListener("DOMContentLoaded", () => {

if (googleBtn) {
  googleBtn.addEventListener('click', () => {
    signInWithPopup(auth, provider)
      .then((result) => {

        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        console.log(token);
        console.log(user);

        window.location.href = './home.html'

      }).catch((error) => {
    
        
        const errorMessage = error.message;
        console.log(errorMessage);

        const credential = GoogleAuthProvider.credentialFromError(error);

      });

  })
}
});