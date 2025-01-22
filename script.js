const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get username and password values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Basic validation (replace with actual server-side validation)
    if (username === '' || password === '') {
        alert('Please enter both username and password.');
        return;
    }

    // Simulate successful login (replace with actual server communication)
    if (username === 'admin' && password === 'admin') {
        // Redirect to admin page
        window.location.href = 'admin.html';
    } else if (username === 'student' && password === 'student') {
        // Redirect to student page
        window.location.href = 'student.html';
    } else {
        alert('Invalid username or password.');
    }
});

vvvv// Admin Page Functionality
const createStudentBtn = document.getElementById('createStudentBtn');
createStudentBtn.addEventListener('click', () => {
    // Fetch student data from the form (if applicable)
    const studentID = document.getElementById('studentID').value;
    const studentName = document.getElementById('studentName').value;
    const diploma = document.getElementById('diploma').value;
    const yearOfEntry = document.getElementById('yearOfEntry').value;
    const email = document.getElementById('email').value;
    const initialPoints = document.getElementById('initialPoints').value;

    // Send data to the server for creation (replace with actual server-side logic)
    fetch('/api/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            studentID,
            studentName,
            diploma,
            yearOfEntry,
            email,
            initialPoints
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Student created successfully!');
            // Optionally, refresh the student list
        } else {
            alert('Error creating student.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while creating the student.');
    });
});

// ... (Implement similar logic for Modify Student, Delete Student, List Students, Search Student, etc.)

// Student Page Functionality
const redeemableItemsBtn = document.getElementById('redeemableItemsBtn');
redeemableItemsBtn.addEventListener('click', () => {
    // Fetch redeemable items from the server (replace with actual server-side logic)
    fetch('/api/items')
        .then(response => response.json())
        .then(items => {
            // Display redeemable items to the user (e.g., in a table or list)
            const itemsList = document.createElement('ul');
            items.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = `${item.name} - ${item.points} points`;
                itemsList.appendChild(listItem);
            });
            // Replace placeholder with the actual element where you want to display the list
            document.getElementById('itemsContainer').appendChild(itemsList); 
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while fetching redeemable items.');
        });
});

const redeemedItemsBtn = document.getElementById('redeemedItemsBtn');
redeemedItemsBtn.addEventListener('click', () => {
    // Fetch redeemed items for the current student (replace with actual server-side logic)
    fetch(`/api/students/${studentID}/redeemed-items`) // Assuming studentID is available
        .then(response => response.json())
        .then(redeemedItems => {
            // Display redeemed items to the user
            // ... (similar implementation as for redeemableItemsBtn) ...
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while fetching redeemed items.');
        });
});