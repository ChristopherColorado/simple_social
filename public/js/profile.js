document
  .querySelector("#profile-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const bio = document.querySelector("#bio").value.trim();
    const birthday = document.querySelector("#birthday").value;
    const profilePicture = document.querySelector("#profile-picture").files[0];

    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("birthday", birthday);
    if (profilePicture) {
      formData.append("profile_picture", profilePicture);
    }

    const response = await fetch(`/users/${user_id}`, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to update profile");
    }
  });
