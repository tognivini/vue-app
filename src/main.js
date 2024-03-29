/* eslint-disable no-undef */
let users = document.getElementById("users");
let userList = []

const create = document.getElementById('create')
if(create){
    create.addEventListener('click', createUser, true);
}

const edit = document.getElementById('edit')
if(edit){
    edit.addEventListener('click', updateUser, true);
}

const delUser = document.getElementById('delete')
if(delUser){
    delUser.addEventListener('click', deleteUser, true);
}

async function getUsers() {
    userList = []
    users.innerHTML = ''
    await axios.get('http://localhost:3333/api/user').then(response => {
        if(response.data){
            userList.push(...response.data)
            response.data.map((user, index) => {
                return (users.innerHTML += `
                  <tr id=${index}>
                    <td class="fw-bold">${user.name}</td>
                    <td class="small text-secondary">${user.email}</td>
                    <td class="small text-secondary">${user.phoneNumber}</td>
                  </tr>
                `);
            });
        }
    })
}

async function createUser() {
    const payload = {
      email: "user",
      phoneNumber: "99999",
      name: "name user"
    }
    await axios.post('http://localhost:3333/api/user/create', payload).then(response=> {
        if(response.status === 200){
            getUsers()
        } 
    });
}

async function updateUser() {
    if(userList[0]?.id){
        const userId = userList[0]?.id
        const payload = {
            email: "email Updated",
            phoneNumber: "88888",
            name: "name Updated"
        }
        await axios.put(`http://localhost:3333/api/user/update/${userId}`, payload).then(response => {
            if(response.status === 200){
                getUsers()
            }
        })
    }
}

async function deleteUser() {
    if(userList[0]?.id){
        const userId = userList[0]?.id
        await axios.delete(`http://localhost:3333/api/user/delete/${userId}`).then(response => {
            if(response.status === 200){
                getUsers()
            }
        })
    }
}

async function getFunctionRoute() {
    const loc = document.location;
    switch (loc.href) {
        case 'http://localhost:8080/':
            await getUsers()
        break;

        case 'http://localhost:8080/create':
            await createUser()
        break;

        case 'http://localhost:8080/edit':
            await getUsers().then(()=> updateUser())
        break;

        case 'http://localhost:8080/delete':
            await getUsers().then(()=> deleteUser())
        break;
        
        default:
            await getUsers()
    }
}

getFunctionRoute()
