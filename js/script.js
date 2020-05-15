// Fetch variables 

const employees = document.getElementById("employees");
const url = 'https://randomuser.me/api/?results=12';

// Fetch functions

function createUser(element) {
    return document.createElement(element);
}


function fetchInfo(url){
    fetch(url)
    .then((response) => (response.json()))
    .then(function (data) {
        console.log(data);
        data.results.forEach(employee => {
            let li = createUser('li');
            let img = createUser('img');
            let name = createUser('p');
            let email = createUser('p');
            let location = createUser('p');
            img.src = employee.picture.medium;
            name.innerHTML = `${employee.name.first} ${employee.name.last}`;
            email.innerHTML = `${employee.email}`;
            location.innerHTML = `${employee.location.city}`;
            li.appendChild(img);
            li.appendChild(name);
            li.appendChild(email);
            li.appendChild(location);
            employees.appendChild(li);
            li.classList.add("employee-card");
        })
    })
    .catch(function (error) {
        console.log(error);
    });
}

// fetch request
document.addEventListener('DOMContentLoaded', () => {
    fetchInfo(url);
});
