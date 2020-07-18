function openForm() {
  document.getElementById("menuItemForm").style.display = "flex";

  // // Disable add session button
  // var addButton = document.getElementById("add-presenter");
  // addButton.disabled = true;
  // addButton.classList.toggle("disabled");

  // // Disable delete buttons
  // var close = document.getElementsByClassName("close");
  // for (var i = 0; i < close.length; i++) {
  //   close[i].disabled = true;
  //   close[i].classList.toggle("disabled");
  // }

  // // Disable edit buttons
  // var editButton = document.getElementsByClassName("edit");
  // for (var i = 0; i < editButton.length; i++) {
  //   editButton[i].disabled = true;
  //   editButton[i].classList.toggle("disabled");
  // }
}

function closeForm() {
  // document.getElementById("name-input").value = "";
  // document.getElementById("email-input").value = "";
  // document.getElementById("phone-input").value = "";
  document.getElementById("menuItemForm").style.display = "none";

  // // Check add session button
  // var addButton = document.getElementById("add-presenter");
  // if (addButton.disabled === true) {
  //   addButton.disabled = false;
  //   addButton.classList.toggle("disabled");
  // }

  // // Enable delete buttons
  // var close = document.getElementsByClassName("close");
  // for (var i = 0; i < close.length; i++) {
  //   if (close[i].disabled === true) {
  //     close[i].disabled = false;
  //     close[i].classList.toggle("disabled");
  //   }
  // }

  // // Enable edit buttons
  // var editButton = document.getElementsByClassName("edit");
  // for (var i = 0; i < editButton.length; i++) {
  //   if (editButton[i].disabled === true) {
  //     editButton[i].disabled = false;
  //     editButton[i].classList.toggle("disabled");
  //   }
  // }
}

function openEditForm() {
  document.getElementById("editMenuItemForm").style.display = "flex";
}

function closeEditForm() {
  document.getElementById("editMenuItemForm").style.display = "none";
}
