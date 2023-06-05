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

async function createUser(event) {
    event.preventDefault()
    const payload = {
      email: "user",
      phoneNumber: "99999",
      name: "name user"
    }
    await axios.post('http://localhost:3333/api/user/create', payload);
    getUsers()
}

async function updateUser(event) {
    event.preventDefault()
    userList.map( async (user) => {
        const userId = user.id
        const payload = {
            email: "email Updated",
            phoneNumber: "88888",
            name: "name Updated"
        }
        await axios.put(`http://localhost:3333/api/user/update/${userId}`, payload)
    })
    setTimeout(getUsers, 500);
}

async function deleteUser(event) {
    event.preventDefault()
    userList.map( async (user) => {
        const userId = user.id
        await axios.delete(`http://localhost:3333/api/user/delete/${userId}`);
    })
    setTimeout(getUsers, 500);
}
    
getUsers()
