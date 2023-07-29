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

// Scroll to top button
const scrollTop = document.querySelector(".scrollTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    scrollTop.classList.add("active");
  } else {
    scrollTop.classList.remove("active");
  }
});

function greetUser() {
  // Ask the user to input their name using a popup input box
  var userName = prompt("Please enter your name:");

  // Check if the user entered a name
  if (userName) {
    // Display a personalized greeting in a popup message
    var greeting = "Hello, " + userName + "! You have checked in!";
    alert(greeting);
  } else {
    // If the user didn't enter a name, display a generic message
    alert("No name added and action canceled!");
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
