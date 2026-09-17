async function userListController(){
    let response = await fetch('http://localhost:3000/users');
    let users = await response.json();
    userListView(users);
    return users;
}

function userListView(users){ //send users from database to webpage
    let table = document.getElementById("userTable");
    let view =  `<thead><tr><th>User ID</th>` +
                `<th>Last Name</th>` +
                `<th>First Name</th>` +
                `<th>Email</th>` +
                `<th>Username</th>` +
                `<th>Password</th></tr></thead>`;

    users.forEach(user => {
        view = view + `<tr><td>${user['userID']}</td>` +
                `<td>${user['lastname']}</td>` +
                `<td>${user['firstname']}</td>` +
                `<td>${user['email']}</td>` +
                `<td>${user['username']}</td>` +
                `<td>${user['passwd']}</td></tr>`;
    });

    table.innerHTML = view;
}

const userDialog = document.getElementById('userPopup');
const userForm = document.getElementById('userForm');
const refresh = document.getElementById('refresh');
const create = document.getElementById('create');
const del = document.getElementById('delete');
//from popup's contents
const urole = 'user'; //users added will be non-admins

userListController();

refresh.addEventListener('click', () => { //updates the screen to the most recent database
    userListController(); 
});

create.addEventListener('click', () => { //show dialog popup
    userDialog.showModal();
});

userForm.addEventListener('submit', async (e) => { e.preventDefault();
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const passwd = document.getElementById('password').value;

    try {
        const response = await fetch('/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, lastname, firstname, passwd, email, urole})
        });

        const data = await response.json();
        
        // Show the success or error message from the backend
        alert(data.message);
        userForm.reset(); 
        userDialog.close();
    } catch (error) {
        console.error('Error sending data:', error);
        alert('Something went wrong. Please try again.');
    }
});

del.addEventListener('click', () => { //exits popup and clear anything in form
    userForm.reset(); 
    userDialog.close();
});