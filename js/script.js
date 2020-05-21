//Variables

    // Fetch

        //"employees" is a <ul> element
    const employees = document.getElementById("employees");
    const url = 'https://randomuser.me/api/?results=12&nat=us';

    //Modal

    const modalContent = document.querySelectorAll("li");
    const modal = document.getElementById("modal-container");
    const closeButton = document.querySelector(".close-button");
    const modalImg = document.getElementById("modal-img");


// Fetch functions

function createUser(element) {
    return document.createElement(element);
}


function fetchInfo(url){
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
   
            
            //add class to set styling
            li.classList.add("employee-card");
            employeeInfo.classList.add("employee-info");


            function showModal(e) {
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

                modalContainer.style.display = 'block';

                modal.classList.add("modal-content")
              }

              let employeeCards = document.querySelectorAll(".employee-card")

              employeeCards[index].addEventListener('click', showModal);







            // Arrow function to scroll to previous/next employee

            function scrollPreviousUser(data) {
                const dob = new Date(Date.parse(employee.dob.date)).toLocaleDateString(navigator.language);
                modal.innerHTML = `
                <div class="modal-container">
                    <div class="modal-content">
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
            }

            function scrollNextUser() {
                console.log(data.results[1].picture.large);
                console.log(employee, 0);
                console.log(index);
                console.log(modalImg.innerHTML);
                modalImg.innerHTML = data.results[1].picture.large;
            }


            //Arrow employee scroll - click function listener
            document.onclick = function arrowClick(e){
                if(e.target.className === "arrowButton right"){
                    scrollNextUser();
                } else if (e.target.className === "arrowButton left"){
                    scrollPreviousUser();
                }
            }






              //click function to close modal by clicking outside of modal div or close button
              window.onclick = function(e){
                if(e.target === modal || e.target.id === "close-button"){
                  modal.style.display = "none";
                } 
              }
              
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











