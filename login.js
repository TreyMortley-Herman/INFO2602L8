async function login(event) {
  // Prevent default action i.e. page redirect
  event.preventDefault();

  // Get form and fields
  const form = event.target;
  const fields = form.elements;

  // Create form data (REQUIRED by lecturer)
  let formData = new URLSearchParams();
  formData.append('username', fields['username'].value);
  formData.append('password', fields['password'].value);

  // Reset form after reading values
  form.reset();

  try {
    // Send POST request to server
    let response = await fetch(`${server}/token`, {  // ⚠️ use /token for login
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    // Convert response to JSON
    let result = await response.json();
    console.log(result);

    // Check if login failed
    if (!response.ok || "detail" in result) {
      toast("Login Failed: " + (result.detail || "Invalid credentials"));
    } else {
      // Login successful
      toast("Login Successful");

      // Store access token in local storage
      window.localStorage.setItem('access_token', result.access_token);

      // Redirect to app page
      window.location.href = 'app.html';
    }

  } catch (error) {
    // Handle server/network error
    console.error(error);
    toast("Login Failed: Server error");
  }
}

// Attach login function to form submit
document.forms['loginForm'].addEventListener('submit', login);