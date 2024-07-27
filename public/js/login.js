async function handleLoginForm(event) {
  event.preventDefault();
  //capture user input
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email);
  console.log(password);
  //fetch to backend API
  const response = await fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({ email: email, password: password }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to login");
  }
}

async function handleRegisterForm(event) {
  event.preventDefault();
  //capture user input
  // const username = document.getElementById("register-username").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  console.log(email);
  console.log(password);

  let formData = new FormData(event.target);

  formData.append("service_id", "service_gz74o9s");
  formData.append("template_id", "welcome_email");
  formData.append("user_id", "SeZxjP3mvHzojzQvf");
  console.log(formData);
  //fetch to backend API
  const response = await fetch("/api/users/register", {
    method: "POST",
    body: JSON.stringify({
      // username: username,
      email: email,
      password: password,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    $("#registerSuccessModal").modal("show");
    // document.location.replace("/");

    const emailResponse = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send-form",
      {
        method: "POST",
        body: formData,
        contentType: false,
        processData: false,
      }
    );
    console.log(emailResponse);
    if (response.status === 200) {
      console.log("Email sent successfully!");
      // document.location.replace("/");
    } else {
      console.log("Failed to send email:");
    }
  } else {
    const errorData = await response.json();
    alert(`Failed to register: ${errorData.message}`);
  }
}

document
  .querySelector("#login-form")
  .addEventListener("submit", handleLoginForm);

document
  .querySelector("#register-form")
  .addEventListener("submit", handleRegisterForm);
