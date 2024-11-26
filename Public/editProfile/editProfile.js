

let username = localStorage.getItem('name')

let inpField = document.getElementById('user-name')
inpField.value = username

document.getElementById('done').addEventListener('click',()=>{
    localStorage.setItem('name', inpField.value)
    inpField.disabled = true;
    // alert('Name updated successfully!');
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Name updated successfully!",
        showConfirmButton: false,
        timer: 1500
      });
})

document.getElementById('editName').addEventListener('click',()=>{
    inpField.disabled = false;
    inpField.focus();
})

