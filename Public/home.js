// import {
//     db,
//     getFirestore,
//     collection,
//     addDoc,
//     getDocs,
//     Timestamp,
//     query,
//     orderBy,
//     limit,
//     doc, deleteDoc
//   } from "./firebase.js";

//   let displayPosts = document.querySelector("#displayPosts");

//   let getData = async () => {
//     let arr = [];
//     const q = query(
//       collection(db, "posts"),
//       orderBy("datenow", "desc"),

//     );
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       arr.push({...doc.data(),docId:doc.id});
//     console.log(arr);


//     });
//     arr.map((item) => {
//       displayPosts.innerHTML += `<div class="card  " style="width: 18rem;">
//               <div class="card-body">
//                 <p class="card-text">${item.description}</p>
//                 <button id="dltBtn">delete</button>
//                 <button id="edtBtn">edit</button>

//               </div>`;
//     });

// }

let edit = document.getElementById('edit');

edit.addEventListener('click', () => {

    let timerInterval;

    Swal.fire({
        title: "Loading",
        html: "Please wait...",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
       
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
        }
    });


    setTimeout(() => {
        window.location.href = './editProfile/editProfile.html'
    }, 2000)
})

let username = localStorage.getItem('name')
// username = JSON.parse(username)
console.log(username)

var newuser = username.split('@')[0]


let uName = document.getElementById('u-name')
uName.innerHTML = `${newuser}`

