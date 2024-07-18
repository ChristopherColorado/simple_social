document
  .querySelector("#preferences-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const emailNotifications = document.querySelector(
      "#email-notifications"
    ).value;
    const colorTheme = document.querySelector("#color-theme").value;

    const response = await fetch(`/users/preferences`, {
      method: "PUT",
      body: JSON.stringify({
        email_notifications: emailNotifications,
        color_theme: colorTheme,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to update preferences");
    }
  });

document
  .querySelector("#delete-account")
  .addEventListener("click", async () => {
    const response = await fetch(`/users/${user_id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to delete account");
    }
  });
