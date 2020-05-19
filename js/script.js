//Variables

    // Fetch

        //"employees" is a <ul> element
    const employees = document.getElementById("employees");
    const url = 'https://randomuser.me/api/?results=12&nat=us';

    //Modal

    const modalContent = document.querySelectorAll("li");
    const modal = document.getElementById("modal-container");
    const closeButton = document.querySelector(".close-button");


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

            let phone = createUser('p');
            let address = createUser('p');
            let birthDate = createUser('p');

            //create container for name, email, location
            //create container for Modal Info (set to display hidden)
            let employeeInfo = createUser('div');
            let modalInfo = createUser('div');

            //set image data
            img.src = employee.picture.medium;

            //set employee name, email and city using placeholders 
            //phone, address and dob are for modal content use
            name.innerHTML = `${employee.name.first} ${employee.name.last}`;
            email.innerHTML = `${employee.email}`;
            location.innerHTML = `${employee.location.city}`;
            phone.innerHTML = `${employee.phone}`;
            address.innerHTML = `${employee.location.street.number} ${employee.location.street.name}${employee.location.state} ${employee.location.postcode}`;
            birthDate.innerHTML = `${employee.dob.date}`;

            //append photo to new list item
            li.appendChild(img);

            //append name, email and location to separate <span> element 
            //to style info in a column to the list item
            employeeInfo.appendChild(name);
            employeeInfo.appendChild(email);
            employeeInfo.appendChild(location);
            modalInfo.appendChild(phone);
            modalInfo.appendChild(address);
            modalInfo.appendChild(birthDate);

            //append the li to the page
            employees.appendChild(li);
            li.appendChild(employeeInfo);
            li.appendChild(modalInfo);
            
            //add class to set styling
            li.classList.add("employee-card");
            employeeInfo.classList.add("employee-info");
            modalInfo.classList.add("modal-info");
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


//Modal script

function showModal(e){
      modal.style.display = "block";
      modal.innerHTML = this.innerHTML;
  }

document.querySelectorAll(".employee-card").addEventListener('click', showModal);

closeButton.onclick = function(){
  modal.style.display = "none";
}
window.onclick = function(e){
  if(e.target === modal){
    modal.style.display = "none";
  }
}





