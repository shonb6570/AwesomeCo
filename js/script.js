//global variables
//"employees" var = <ul> element
const employees = document.getElementById("employees");
const url = 'https://randomuser.me/api/?results=12&nat=us';

//Modal variables
const modalContent = document.querySelectorAll("li");
const modal = document.getElementById("modal-container");
const closeButton = document.querySelector(".close-button");

// Fetch functions
function createUser(element) {
  return document.createElement(element);
}

function fetchInfo(url) {
  fetch(url)
    .then((response) => (response.json()))
    .then(function (data) {
      console.log(data);
      data.results.forEach((employee, index) => {
        //create html elements for API employee data  
        let li = createUser('li');
        let img = createUser('img');
        let name = createUser('h3');
        let email = createUser('p');
        let location = createUser('p');
        //create container for name, email, location
        //create container for Modal Info (set to display hidden)
        let employeeInfo = createUser('div');
        //set image data
        img.src = employee.picture.medium;

        //set employee name, email and city using placeholders 
        //phone, address and dob are for modal content use
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

        //add class to set css styling
        li.classList.add("employee-card");
        employeeInfo.classList.add("employee-info");

        let employeeCards = document.querySelectorAll(".employee-card")
        employeeCards[index].addEventListener('click', () => {
          showModal(data.results, employee, index);
        });

        //click function to close modal by clicking outside of modal div or close button
        window.onclick = function (e) {
          if (e.target === modal || e.target.id === "close-button") {
            modal.style.display = "none";
          }
        };

      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

//modal function to create html template - employees = API results (total results of 12 objects), 
//employee = 1 iteration (1 result object)
//index = iteration index number (or, employee index number)

function showModal(employees, employee, index) {
  modal.style.display = "block";
  const dob = new Date(Date.parse(employee.dob.date)).toLocaleDateString(navigator.language);
  modal.innerHTML = `
        <div class="modal-container">
            <div class="modal-content" data-index="${index}">
            <span id="close-button">&times;</span>
                <button class="arrowButton left">&lsaquo;</button>
                <img class="modal-img" src="${employee.picture.large}" alt="${employee.name.first}'s profile picture">
                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.location.city}</p><hr>
                <p class="modal-text">${employee.phone}</p>
                <p class="modal-text cap">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.state} ${employee.location.postcode}</p>
                <p class="modal-text">Birthday: ${dob}</p>
                <button class="arrowButton right">&rsaquo;</button>
            </div>
        </div>
        `;

  modal.classList.add("modal-content");

  //arrow scroll function - resets data results index by +1 or -1 depending on next/previous employee
  function scrollPreviousUser() {
    showModal(employees, employees[index - 1], index - 1)
  }

  function scrollNextUser() {
    showModal(employees, employees[index + 1], index + 1);
  }

  //Arrow employee scroll - click function listener
  //if the arrow is left arrow is clicked on the first employee the index 
  //counter falls below 1, then it is reset to the last employee
  //and vice-versa for the last employee (index is reset to the first employee) 
  document.onclick = function arrowClick(e) {
    if (e.target.className === "arrowButton right") {
      console.log(index);
      if(index > 10){
        showModal(employees, employees[index - 11], index - 11);
      } else{
        scrollNextUser();
      }
    } else if (e.target.className === "arrowButton left") {
      if(index < 1){
        showModal(employees, employees[index + 11], index + 11);
      } else{
        scrollPreviousUser();
      }
    }
  };

}

// fetch request
document.addEventListener('DOMContentLoaded', () => {
  fetchInfo(url);
});
