

let username = localStorage.getItem('name')

let inpField = document.getElementById('user-name')
inpField.value = username

document.getElementById('done').addEventListener('click', () => {
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

document.getElementById('editName').addEventListener('click', () => {
    inpField.disabled = false;
    inpField.focus();
})

//change profile 

const image = document.getElementById('uploadImage');
const fileInput = document.getElementById('fileInput');

// Check if there's an image saved in local storage
const savedImage = localStorage.getItem('uploadedImage');
if (savedImage) {
    image.src = savedImage; // Load saved image on page reload
}

// Add a click event listener to the image
image.addEventListener('click', () => {
    fileInput.click(); // Trigger the file input dialog
});

// Handle file input change event
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
        // Use FileReader to display the selected image
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = e.target.result;
            image.src = imageData; // Update image source
            localStorage.setItem('uploadedImage', imageData); // Save image data to local storage
        };
        reader.readAsDataURL(file);
    }
});