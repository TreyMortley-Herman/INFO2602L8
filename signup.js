async function signup(event) {
  // Prevent default action i.e. page redirect
  event.preventDefault();

  // Get form and fields
  const form = event.target;
  const fields = form.elements;

  // Create form data (REQUIRED)
  let formData = new URLSearchParams();
  formData.append('username', fields['username'].value);
  formData.append('password', fields['password'].value);

  // Reset form
  form.reset();

  try {
    // Send POST request to signup endpoint
    let response = await fetch(`${server}/signup`, { // ⚠️ may be /signup or /register
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    // Convert response to JSON
    let result = await response.json();
    console.log(result);

    // Check if signup failed
    if (!response.ok || "detail" in result) {
      toast("Register Failed: " + (result.detail || "Error"));
    } else {
      // Signup successful
      toast("Register Successful");

      // Redirect to login page
      window.location.href = 'index.html';
    }

  } catch (error) {
    // Handle error
    console.error(error);
    toast("Register Failed: Server error");
  }
}

// Attach signup function to form submit
document.forms['signUpForm'].addEventListener('submit', signup);