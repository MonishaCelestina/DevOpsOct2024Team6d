document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Login successful!");
            localStorage.setItem('student', JSON.stringify(data.student)); // Store student session
            window.location.href = "student.html"; // Redirect to student page
        } else {
            errorMessage.textContent = data.message; // Show error message
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = "Something went wrong. Try again later.";
    }
});
