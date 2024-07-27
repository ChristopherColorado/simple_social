document.addEventListener("DOMContentLoaded", function () {
  const postForm = document.getElementById("post-form");
  if (postForm) {
    postForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const formData = new FormData(this);
      const data = { content: formData.get("content") };
      try {
        const response = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          window.location.reload(); // Refresh the page to display the new post
        } else {
          const errorData = await response.json();
          alert(`Failed to create post: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to create post");
      }
    });
  }

  const logoutForm = document.getElementById("logout-form");
  if (logoutForm) {
    logoutForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      try {
        const response = await fetch("/api/users/logout", {
          method: "POST",
        });
        if (response.ok) {
          window.location.href = "/login";
        } else {
          alert("Failed to log out");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to log out");
      }
    });
  }
});
