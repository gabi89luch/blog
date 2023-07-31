/*!
 * Start Bootstrap - Clean Blog v6.0.8 (https://startbootstrap.com/theme/clean-blog)
 * Copyright 2013-2022 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
 */
window.addEventListener("DOMContentLoaded", () => {
  let scrollPos = 0;
  const mainNav = document.getElementById("mainNav");
  const headerHeight = mainNav.clientHeight;
  window.addEventListener("scroll", function () {
    const currentTop = document.body.getBoundingClientRect().top * -1;
    if (currentTop < scrollPos) {
      // Scrolling Up
      if (currentTop > 0 && mainNav.classList.contains("is-fixed")) {
        mainNav.classList.add("is-visible");
      } else {
        console.log(123);
        mainNav.classList.remove("is-visible", "is-fixed");
      }
    } else {
      // Scrolling Down
      mainNav.classList.remove(["is-visible"]);
      if (
        currentTop > headerHeight &&
        !mainNav.classList.contains("is-fixed")
      ) {
        mainNav.classList.add("is-fixed");
      }
    }
    scrollPos = currentTop;
  });
});

// Function to save the user's name in local storage and update the welcome message
function saveName() {
  const nameInput = document.getElementById("name");
  const name = nameInput.value.trim();

  if (name === "") {
      alert("Please enter your name.");
      return;
  }

  // Save the name in local storage
  localStorage.setItem("visitorName", name);

  // Update the welcome message in the header
  const welcomeMessage = document.getElementById("welcome-message");
  welcomeMessage.textContent = `Welcome, ${name}!`;
}

// This event listener waits for the DOM (Document Object Model) to be fully loaded before executing the provided function.
document.addEventListener('DOMContentLoaded', function () {
  // Get the reference to the contact form and the submit button element.
  const form = document.getElementById('contactForm');
  const submitButton = document.getElementById('submitButton');

  // Attach a 'submit' event listener to the form. This function will be executed when the form is submitted.
  form.addEventListener('submit', function (event) {
      // Prevent the default form submission behavior, which would cause a page reload.
      event.preventDefault();

      // Get the values entered by the user in the form fields.
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const message = document.getElementById('message').value;

      // Create a JavaScript object to store the form data.
      const formData = {
          name: name,
          email: email,
          phone: phone,
          message: message
      };

      // Convert the form data object to a JSON string.
      const jsonData = JSON.stringify(formData);

      // Save the form data to the JSON file using the saveFormData function.
      saveFormData(jsonData);

      // Show a success message to the user (optional).
      showSuccessMessage();

      // Reset the form fields after successful submission (optional).
      form.reset();
  });

  // Function to save the form data to a JSON file.
  function saveFormData(jsonData) {
      // Modify this path to your desired location to save the JSON file.
      const saveFilePath = 'submissions.json';

      // Fetch the existing data (if any) from the JSON file.
      fetch(saveFilePath)
          .then(response => response.json())
          .then(data => {
              // Append the new form data to the existing data array or create a new array if there is no existing data.
              const allData = data ? [...data, jsonData] : [jsonData];

              // Convert the array containing all form data to a JSON string.
              const allDataJson = JSON.stringify(allData);

              // Save the updated data to the JSON file using a POST request.
              fetch(saveFilePath, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: allDataJson
              });
          })
          .catch(error => console.error('Error fetching data:', error));
  }

  function redirectToConfirmationPopup() {
      // Show a popup message to the user as a confirmation.
      alert('Thank you for your message! We have received your submission.');

      // Optionally, you can reset the form after showing the confirmation message.
      form.reset();
}

  // Function to show a success message to the user (optional).
  function showSuccessMessage() {
      // You can show a success message here if you want.
      // Get the element with the 'submitSuccessMessage' ID and remove the 'd-none' class to display it.
      const successMessage = document.getElementById('submitSuccessMessage');
      successMessage.classList.remove('d-none');
  }
});

// Scroll to top button
const scrollTop = document.querySelector(".scrollTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    scrollTop.classList.add("active");
  } else {
    scrollTop.classList.remove("active");
  }
});

//Greeting users
// Define a function called greetUser
function greetUser() {
  // Ask the user to input their name using a popup input box
  var userName = prompt("Please enter your name:");

  // Check if the user entered a name
  if (userName) {
    // Display a personalized greeting in a popup message
    var greeting = "Hello, " + userName + "! You have checked in!";
    // Show the personalized greeting in an alert box
    alert(greeting);
  } else {
    // If the user didn't enter a name, display a generic message
    alert("No name added!");
  }
}

// Geolocation HTML5
// Set up global variable
var result;

function showPosition() {
  // Store the element where the page displays the result
  result = document.getElementById("result");

  // If geolocation is available, try to get the visitor's position
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    result.innerHTML = "Getting the position information...";
  } else {
    alert("Sorry, your browser does not support HTML5 geolocation.");
  }
}

// Define callback function for successful attempt
function successCallback(position) {
  result.innerHTML =
    "Your current position is (" +
    "Latitude: " +
    position.coords.latitude +
    ", " +
    "Longitude: " +
    position.coords.longitude +
    ")";
}

// Define callback function for failed attempt
function errorCallback(error) {
  if (error.code == 1) {
    result.innerHTML =
      "You've decided not to share your position, but it's OK. We won't ask you again.";
  } else if (error.code == 2) {
    result.innerHTML =
      "The network is down or the positioning service can't be reached.";
  } else if (error.code == 3) {
    result.innerHTML =
      "The attempt timed out before it could get the location data.";
  } else {
    result.innerHTML = "Geolocation failed due to unknown error.";
  }
}

// Comment section
// VOTE
const minus = document.querySelectorAll(".minus");
const plus = document.querySelectorAll(".plus");
let change = false;

const voteChange = (btn, voteText) => {
  if (btn.classList.contains("plus")) {
    if (change) return;
    voteText.innerText = parseFloat(voteText.innerText) + 1;
    change = true;
  }
  if (btn.classList.contains("minus")) {
    if (!change) return;
    voteText.innerText = parseFloat(voteText.innerText) - 1;
    change = false;
  }
};

minus.forEach((btn) => {
  btn.onclick = () => {
    const voteText = btn.previousElementSibling;
    voteChange(btn, voteText);
  };
});

plus.forEach((btn) => {
  btn.onclick = () => {
    const voteText = btn.nextElementSibling;
    voteChange(btn, voteText);
  };
});

// Reply
const replyButtons = document.querySelectorAll(".reply");

replyButtons.forEach((btn) => {
  btn.onclick = () => {
    const card = btn.parentElement.parentElement;
    const comment = card.lastElementChild;
    const name = card.children[1].children[1].innerText;
    let textArea = comment.children[1];
    comment.classList.toggle("active");

    const cardParent = card.parentElement;
    const subCardparent = card.parentElement.parentElement;
    const replyButton = comment.lastElementChild;
    replyButton.onclick = () => {
      let subCard = document.createElement("div");
      subCard.className = "sub-card";
      subCard.innerHTML = `<div class="line"></div>
          <div class="card">
            <div class="vote">
              <div class="vote-icon plus">
                <img src="assets/images/icon-plus.svg" alt="icon-plus" />
              </div>
              <p class="vote-text">0</p>
              <div class="vote-icon minus">
                <img src="assets/images/icon-minus.svg" alt="icon-minus" />
              </div>
            </div>
            <div class="header">
              <div class="avatar">
                <img src="assets/images/avatars/image-juliusomo.png" alt="" />
              </div>
              <p class="name">juliusomo <span class="user-label">you</span></p>
              <p class="date">just now</p>
            </div>
            <div class="icon">
              <div class="delete" onclick="showModule()">
                <img src="assets/images/icon-delete.svg" alt="" />
                <p>Delete</p>
              </div>
              <div class="edit" onclick="editComment()">
                <img src="assets/images/icon-edit.svg" alt="" />
                <p>Edit</p>
              </div>
            </div>
            <div class="content">
              <span class="initial">@${name}</span> ${textArea.value}
            </div>
          </div>`;
      if (card.parentNode.classList.contains("row")) {
        cardParent.append(subCard);
        textArea.value = "";
      }
      if (card.parentNode.classList.contains("sub-card")) {
        subCardparent.append(subCard);
        textArea.value = "";
      }
      comment.classList.remove("active");
    };
  };
});

// DELETE MODULE
const module = document.querySelector(".module-delete");

function showModule() {
  module.classList.add("show-module");
}

const btnCancelModule = document.querySelector(".btn-cancel");
const btnDeleteModule = document.querySelector(".btn-delete");

btnCancelModule.onclick = () => {
  module.classList.remove("show-module");
};

btnDeleteModule.onclick = () => {
  const deletebutton = document.querySelector(".delete");
  const card = deletebutton.parentElement;
  card.parentElement.remove();
  module.classList.remove("show-module");
};

function editComment() {
  const editbutton = document.querySelector(".edit");
  const deletebutton = document.querySelector(".delete");
  const content = editbutton.parentElement.nextElementSibling;
  const textArea = content.innerText;
  editbutton.style.opacity = "0.6";
  deletebutton.style.opacity = "0.6";
  editbutton.style.cursor = "not-allowed";
  deletebutton.style.cursor = "not-allowed";
  content.innerHTML = `<textarea rows="4" cols="50" class="editedComment">${textArea} </textarea>
  <div class="btn-update-wrapper" ><button class="btn btn-update">UPDATE</button></div>`;

  const updateButton = document.querySelector(".btn-update");
  const newTextArea = document.querySelector(".editedComment");
  updateButton.onclick = () => {
    content.innerHTML = `${newTextArea.value}`;
    editbutton.style.opacity = "1";
    deletebutton.style.opacity = "1";
    editbutton.style.cursor = "pointer";
    deletebutton.style.cursor = "pointer";
  };
}

const btnSendComment = document.querySelector(".btn-send");
btnSendComment.onclick = () => {
  const newRow = document.createElement("div");
  const textArea = btnSendComment.previousElementSibling;
  if (textArea.value == "") return;
  newRow.className = "row";
  newRow.innerHTML = `<div class="card">
          <div class="vote">
            <div class="vote-icon plus">
              <img src="assets/images/icon-plus.svg" alt="icon-plus" />
            </div>
            <p class="vote-text">0</p>
            <div class="vote-icon minus">
              <img src="assets/images/icon-minus.svg" alt="icon-minus" />
            </div>
          </div>
          <div class="header">
            <div class="avatar">
              <img src="assets/images/avatars/image-juliusomo.png" alt="" />
            </div>
            <p class="name">juliusomo</p>
            <p class="date">just now</p>
          </div>
          <div class="icon">
              <div class="delete" onclick="showModule()">
                <img src="assets/images/icon-delete.svg" alt="" />
                <p>Delete</p>
              </div>
              <div class="edit" onclick="editComment()">
                <img src="assets/images/icon-edit.svg" alt="" />
                <p>Edit</p>
              </div>
          </div>
          <div class="content">
            ${textArea.value}
          </div>
          
        </div>`;

  const btnParrent = btnSendComment.parentElement.parentElement;
  const cardWrapper = document.querySelector(".card-wrapper");

  cardWrapper.insertBefore(newRow, btnParrent);
  textArea.value = "";
};
// Checking button
function myFunction() {
  let person = prompt("Please enter your name", "John Doe");
  if (person != null) {
    document.getElementById("demo").innerHTML =
      "Hello " + person + "! How are you today?";
  }
}
