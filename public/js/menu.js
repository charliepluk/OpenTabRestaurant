function openForm() {
  document.getElementById("menuItemForm").style.display = "flex";
}

function closeForm() {
  document.getElementById("menuItemForm").style.display = "none";
}

function openEditForm(itemID, itemName, itemPrice, itemDescription) {
  document.getElementById("editItemID").value = itemID;
  document.getElementById("editItemName").value = itemName;
  document.getElementById("editItemPrice").value = itemPrice;
  document.getElementById("editItemDesc").value = itemDescription;

  document.getElementById("deleteItem").onclick = function () {
    var jsonObj = {
      itemID: itemID,
    };

    sendPostRequest(jsonObj, "menu/delete");
  };
  document.getElementById("editMenuItemForm").style.display = "flex";
}

function closeEditForm() {
  document.getElementById("editMenuItemForm").style.display = "none";
  document.getElementById("editItemID").value = "";
  document.getElementById("editItemName").value = "";
  document.getElementById("editItemPrice").value = "";
  document.getElementById("editItemDesc").value = "";
}
