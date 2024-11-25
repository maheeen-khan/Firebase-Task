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

