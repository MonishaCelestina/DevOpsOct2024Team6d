const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Perform login validation here
  // For example, you can send a request to your server to check the credentials

  if (username === 'admin' && password === 'password') {
    // Login successful
    alert('Login successful!');
    // Redirect to the home page or dashboard
  } else {
    // Login failed
    alert('Invalid username or password!');
  }
});