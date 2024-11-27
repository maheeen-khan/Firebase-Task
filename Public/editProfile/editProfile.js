let uploadPreset = 'wmbrbjnt';
let cloudName = 'dlny0bzx6';

// Manage username
let username = localStorage.getItem('name');
const inpField = document.getElementById('user-name');
inpField.value = username;

// "Done" button: Save and disable editing of the name
document.getElementById('done').addEventListener('click', () => {
    localStorage.setItem('name', inpField.value); // Save name to local storage
    inpField.disabled = true; // Disable input field
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Name updated successfully!",
        showConfirmButton: false,
        timer: 1500
    });
});

// "Edit Name" button: Enable editing of the name
document.getElementById('editName').addEventListener('click', () => {
    inpField.disabled = false; // Enable input field
    inpField.focus(); // Focus the input field for editing
});

// Manage profile image
const image = document.getElementById('uploadImage');
const fileInput = document.getElementById('fileInput');
const removeDPbtn = document.getElementById('removeDPbtn');
const defaultImageUrl = "../../images/user-removebg-preview.png"; // Default profile image path

// Load saved profile image URL from localStorage (if it exists)
const savedImageUrl = localStorage.getItem('profileImageUrl');
image.src = savedImageUrl ? savedImageUrl : defaultImageUrl; // Use saved URL or default image

// Add a click event listener to the image
image.addEventListener('click', () => {
    fileInput.click(); // Trigger the file input dialog
});

// Handle file input change event
fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
        // Display the selected image locally while uploading
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = e.target.result;
            image.src = imageData; // Temporarily show the image
        };
        reader.readAsDataURL(file);

        // Save to Cloudinary
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "profilePicture");
        formData.append("upload_preset", uploadPreset);

        try {
            let response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            console.log('Uploaded to Cloudinary:', result);

            if (result.secure_url) {
                image.src = result.secure_url; // Update image source with Cloudinary URL

                // Save the Cloudinary URL to localStorage
                localStorage.setItem('profileImageUrl', result.secure_url);

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Profile picture updated successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (err) {
            console.error("Error uploading to Cloudinary:", err);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to upload image!",
                text: "Please try again.",
                showConfirmButton: true
            });
        }
    }
});

// Handle "Remove Profile" button
removeDPbtn.addEventListener('click', () => {
    image.src = defaultImageUrl; // Set the image to the default profile picture
    localStorage.setItem('profileImageUrl', defaultImageUrl); // Update localStorage with the default image

    Swal.fire({
        position: "center",
        icon: "info",
        title: "Profile picture removed!",
        showConfirmButton: false,
        timer: 1500
    });
});
