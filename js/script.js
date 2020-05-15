// Fetch variables 

        //"employees" is a <ul> element
const employees = document.getElementById("employees");
const url = 'https://randomuser.me/api/?results=12&nat=us';

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
            let name = createUser('h3');
            let email = createUser('p');
            let location = createUser('p');

            //create container for name, email, location
            let employeeInfo = createUser('div');

            //set image data
            img.src = employee.picture.medium;

            //set employee name, email and city using placeholders 
            name.innerHTML = `${employee.name.first} ${employee.name.last}`;
            email.innerHTML = `${employee.email}`;
            location.innerHTML = `${employee.location.city}`;

            //append photo to new list item
            li.appendChild(img);

            //append name, email and location to separate <span> element 
            //to style info in a column to the list item
            employeeInfo.appendChild(name);
            employeeInfo.appendChild(email);
            employeeInfo.appendChild(location);

            //append the li to the page
            employees.appendChild(li);
            li.appendChild(employeeInfo);
            
            //add class to set styling
            li.classList.add("employee-card");
            employeeInfo.classList.add("employee-info");
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
