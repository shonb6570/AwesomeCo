// Fetch variables 

        //"employees" is a <ul> element
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
            //create html elements for API employee data  
            let li = createUser('li');
            let img = createUser('img');
            let name = createUser('p');
            let email = createUser('p');
            let location = createUser('p');

            //create container for name, email, location
            let employeeInfo = createUser('span');

            //set image data
            img.src = employee.picture.medium;
            //set employee name, email and city using placeholders 
            name.innerHTML = `${employee.name.first} ${employee.name.last}`;
            email.innerHTML = `${employee.email}`;
            location.innerHTML = `${employee.location.city}`;
            //finally, append data to created elements
            li.appendChild(img);

            

            li.appendChild(name);
            li.appendChild(email);
            li.appendChild(location);
            employees.appendChild(li);
            //add class to set styling
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
