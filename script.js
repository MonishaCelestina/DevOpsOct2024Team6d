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

/// Admin Page Functionality
const createStudentBtn = document.getElementById('createStudentBtn');
const createStudentForm = document.getElementById('createStudentForm');
const createStudentSubmitBtn = document.getElementById('createStudentSubmitBtn');
const studentIDInput = document.getElementById('studentID');
const studentNameInput = document.getElementById('studentName');
const diplomaInput = document.getElementById('diploma');
const yearOfEntryInput = document.getElementById('yearOfEntry');
const emailInput = document.getElementById('email');
const initialPointsInput = document.getElementById('initialPoints');

createStudentBtn.addEventListener('click', () => {
    createStudentForm.style.display = 'block';
});

createStudentSubmitBtn.addEventListener('click', () => {
    const studentID = studentIDInput.value;
    const studentName = studentNameInput.value;
    const diploma = diplomaInput.value;
    const yearOfEntry = yearOfEntryInput.value;
    const email = emailInput.value;
    const initialPoints = initialPointsInput.value;

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
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); 
    })
    .then(data => { 
        alert('Student created successfully!');
        createStudentForm.style.display = 'none'; 
        // ... (Clear input fields and refresh student list as before) ...
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while creating the student. Please check the console for details.');
    });
});

const modifyStudentBtn = document.getElementById('modifyStudentBtn');
const modifyStudentForm = document.getElementById('modifyStudentForm');
const modifyStudentIDInput = document.getElementById('modifyStudentID');
const modifyStudentData = document.getElementById('modifyStudentData');

modifyStudentBtn.addEventListener('click', () => {
    modifyStudentForm.style.display = 'block';
});

const loadStudentBtn = document.getElementById('loadStudentBtn');
loadStudentBtn.addEventListener('click', () => {
    const studentID = modifyStudentIDInput.value;
    fetch(`/api/students/${studentID}`)
        .then(response => response.json())
        .then(student => {
            modifyStudentData.innerHTML = `
                <label for="modifyStudentName">Student Name:</label>
                <input type="text" id="modifyStudentName" value="${student.studentName}"><br><br>
                <label for="modifyDiploma">Diploma:</label>
                <input type="text" id="modifyDiploma" value="${student.diploma}"><br><br>
                <label for="modifyYearOfEntry">Year of Entry:</label>
                <input type="number" id="modifyYearOfEntry" value="${student.yearOfEntry}"><br><br>
                <label for="modifyEmail">Email:</label>
                <input type="email" id="modifyEmail" value="${student.email}"><br><br>
                <button id="saveStudentBtn">Save</button>
            `;

            const saveStudentBtn = document.getElementById('saveStudentBtn');
            saveStudentBtn.addEventListener('click', () => {
                const modifiedName = document.getElementById('modifyStudentName').value;
                const modifiedDiploma = document.getElementById('modifyDiploma').value;
                const modifiedYearOfEntry = document.getElementById('modifyYearOfEntry').value;
                const modifiedEmail = document.getElementById('modifyEmail').value;

                fetch(`/api/students/${studentID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        studentName: modifiedName,
                        diploma: modifiedDiploma,
                        yearOfEntry: modifiedYearOfEntry,
                        email: modifiedEmail
                    })
                })
                .then(response => {
                    if (response.ok) {
                        alert('Student updated successfully!');
                        modifyStudentForm.style.display = 'none';
                        listStudents(); 
                    } else {
                        alert('Error updating student.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred while updating the student.');
                });
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error fetching student data.');
        });
    });

const deleteStudentBtn = document.getElementById('deleteStudentBtn');
deleteStudentBtn.addEventListener('click', () => {
    const studentID = prompt("Enter Student ID to Delete");
    if (studentID) {
        fetch(`/api/students/${studentID}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    alert('Student deleted successfully!');
                    listStudents(); 
                } else {
                    alert('Error deleting student.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while deleting the student.');
            });
    }
});

const listStudentsBtn = document.getElementById('listStudentsBtn');
listStudentsBtn.addEventListener('click', () => {
    listStudents(); 
});

function listStudents() {
    fetch('/api/students')
        .then(response => response.json())
        .then(students => {
            const studentListContainer = document.getElementById('studentListContainer');
            studentListContainer.innerHTML = ''; 

            const table = document.createElement('table');
            const headerRow = table.insertRow();
            headerRow.insertCell().textContent = "Student ID";
            headerRow.insertCell().textContent = "Name";
            headerRow.insertCell().textContent = "Diploma";
            headerRow.insertCell().textContent = "Year of Entry";
            headerRow.insertCell().textContent = "Email";
            headerRow.insertCell().textContent = "Points";

            students.forEach(student => {
                const row = table.insertRow();
                row.insertCell().textContent = student.studentID;
                row.insertCell().textContent = student.studentName;
                row.insertCell().textContent = student.diploma;
                row.insertCell().textContent = student.yearOfEntry;
                row.insertCell().textContent = student.email;
                row.insertCell().textContent = student.points;
            });

            studentListContainer.appendChild(table);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while fetching student list.');
        });
}

const searchStudentBtn = document.getElementById('searchStudentBtn');
const searchStudentResults = document.getElementById('searchStudentResults');

searchStudentBtn.addEventListener('click', () => {
    const searchTerm = prompt("Enter Student ID or Name to Search");
    if (searchTerm) {
        fetch(`/api/students/search?term=${searchTerm}`) 
            .then(response => response.json())
            .then(students => {
                searchStudentResults.innerHTML = ''; 

                const table = document.createElement('table');
                const headerRow = table.insertRow();
                headerRow.insertCell().textContent = "Student ID";
                headerRow.insertCell().textContent = "Name";
                headerRow.insertCell().textContent = "Diploma";
                headerRow.insertCell().textContent = "Year of Entry";
                headerRow.insertCell().textContent = "Email";
                headerRow.insertCell().textContent = "Points";

                students.forEach(student => {
                    const row = table.insertRow();
                    row.insertCell().textContent = student.studentID;
                    row.insertCell().textContent = student.studentName;
                    row.insertCell().textContent = student.diploma;
                    row.insertCell().textContent = student.yearOfEntry;
                    row.insertCell().textContent = student.email;
                    row.insertCell().textContent = student.points;
                });

                searchStudentResults.appendChild(table);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while searching for students.');
            });
    }
});

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