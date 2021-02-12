function generateUsersTableHead(data) {
    $(function () {
        $('#users_table').DataTable({
          "pageLength": 3,
          "paging": false,
          "lengthChange": true,
          "searching": false,
          "ordering": true,
          "info": false,
          "autoWidth": true,
          "order": [1, "asc"]
          });
    });
    const table = document.getElementById('users_table');

    let thead = table.createTHead();
    let row = thead.insertRow();
    let th = document.createElement("th");
    let text;
    
    if (data.id) {
        text = document.createTextNode("User ID");
        th.appendChild(text);
        th.style.display = "none";
        row.appendChild(th);
    }

    th = document.createElement("th");
    if (data.fname) {
        text = document.createTextNode("Name");
        th.appendChild(text);
        row.appendChild(th);
    }
    
    th = document.createElement("th");
    if (data.permissions) {
        if (data.permissions == 1) {
            text = document.createTextNode("Volunteer");
        }
        else if (data.permissions == 2 ) {
            text = document.createTextNode("Supervisor");
        }
        else if (data.permissions == 3 ) {
            text = document.createTextNode("Owner");
        }
        th.appendChild(text);
        row.appendChild(th);
    }
    
    th = document.createElement("th");
    if (data.dateActive) { 
        text = document.createTextNode("Modify");
        th.appendChild(text);
        row.appendChild(th);
    }
}

function loadUsersTable(users){
    let loadPromise = function(resolve,reject) {
        const table = document.getElementById('users_table');
        for (let element of users) {
            if (element.isActive == true) {
                let row = table.insertRow();
                row.id = element.id;

                //user id
                cell = row.insertCell();
                let text = document.createTextNode(element.id);
                cell.appendChild(text);
                cell.style.display = "none";

                //first and last name
                cell = row.insertCell();
                text = document.createTextNode(element.fname + " " + element.lname);
                cell.appendChild(text);

                //role
                cell = row.insertCell();
                if (element.permissions == 1) {
                    text = document.createTextNode("Volunteer");
                }
                else if (element.permissions == 2 ) {
                    text = document.createTextNode("Supervisor");
                }
                else if (element.permissions == 3 ) {
                    text = document.createTextNode("Owner");
                }
                cell.appendChild(text);

                //modify
                cell = row.insertCell();
                text = document.createTextNode("");
                cell.innerHTML = "<div style=\"font-size:1.5rem;color:#e00122;display:inline-block;width:50%;\" id=\"EditBtn\" onclick =\"popEditUser('"+element.id+"','"+element.fname+"','"+element.lname+"','"+element.mNumber+"','"+element.permissions+"')\"><img src=\"../images/edit-solid.svg\"/></div><div style=\"font-size:1.5rem;color:#e00122;display:inline-block;width:50%;\" id=\"DeleteBtn\" onclick =\"popConfirmDeleteUser('"+element.id+"','"+element.fname+"','"+element.lname+"')\"><img src=\"../images/trash-solid.svg\"/></div>";
                cell.appendChild(text);
            }
        }
        resolve(users[0]);
    }
    return new Promise(loadPromise);
}

//JOIN table for the inventory
async function getUsers(){
    let response = await fetch("http://localhost:8080/users/")
    try{
        return await response.json();
    }catch{
        return "notFound";
    }
}

async function createUsersTable(){
    getUsers().then(
        data => {
            if (data != "notFound") {
                loadUsersTable(data).then(result => generateUsersTableHead(result));
            }

        }
    )
}

createUsersTable();

//On Submit of new user modal create new user
async function submitNewUser(){
    let mNumber = document.getElementById("userMNum").value;
    let FName = document.getElementById("AddfName").value;
    let LName = document.getElementById("AddlName").value;
    let PermissionLevel = document.getElementById("typeUser").value;
    if (PermissionLevel == "Supervisor") {
        PermissionLevel = 2;
    }
    else if (PermissionLevel == "Owner") {
        PermissionLevel = 3;
    }
    else {
        PermissionLevel = 1;
    }
    let ActiveStatus = 1;
    document.getElementById("addUser").style.display = "none";
    document.getElementById('page-mask').style.position = "unset";
    //Call API Endpoint
    await addUser(mNumber, FName, LName, PermissionLevel, ActiveStatus);
    location.reload();
}

async function addUser(mNumber, FName, LName, PermissionLevel, ActiveStatus){
    //POST to user table
    let userData = {'mNumber':mNumber,'fname':FName, 'lname':LName, 'permissions':PermissionLevel, 'isActive':ActiveStatus}
    let userFormBody =[];
    for (let userKey in userData){
        let encodedUserKey = encodeURIComponent(userKey);
        let encodedUserValue = encodeURIComponent(userData[userKey]);
        userFormBody.push(encodedUserKey+"="+encodedUserValue);
    }
    userFormBody = userFormBody.join("&");
    
    fetch('http://localhost:8080/users', {
        body: userFormBody,
        method:"POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    }).then(response => response.json())
        .then(data=> {console.log('Success');})
        .catch((error)=>{ console.error('Error:', error);location.reload();});
}