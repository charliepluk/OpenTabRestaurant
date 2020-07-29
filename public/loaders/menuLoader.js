// Display Menu on page load
loadMenuItems();

// Function to Load menu items
function loadMenuItems() {
  var handler = "/menu/query";
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      result = JSON.parse(this.response);

      for (var i = 0; i < result.length; i++) {
        var itemID = result[i].itemID;
        var itemName = result[i].itemName;
        var itemPrice = result[i].itemPrice;
        var itemDescription = result[i].itemDescription;
        var itemType = result[i].itemType;

        createItem(itemID, itemName, itemPrice, itemDescription, itemType);
      }
    }
  };

  xhr.open("GET", handler);
  xhr.send();
}

function createItem(itemID, itemName, itemPrice, itemDescription, itemType) {
  // Create DIV to hold new menu item
  var menuItemDiv = document.createElement("div");
  menuItemDiv.classList.add("menu-item");
  menuItemDiv.id = itemID;
  menuItemDiv.onclick = function () {
    openEditForm(itemID, itemName, itemPrice, itemDescription);
  };

  // Create item name div
  var itemNameDiv = document.createElement("div");
  itemNameDiv.classList.add("item-name");

  // Create item name text
  var nameText = document.createTextNode(itemName);
  var itemNameText = document.createElement("h3");
  itemNameText.appendChild(nameText);

  // Append Item Name Div Text
  itemNameDiv.appendChild(itemNameText);

  // Create item desc div
  var itemDescDiv = document.createElement("div");
  itemDescDiv.classList.add("item-desc");

  // Create item desc div text
  var priceText = document.createTextNode("$" + itemPrice.toFixed(2));
  var itemPriceText = document.createElement("h5");
  itemPriceText.appendChild(priceText);

  var descText = document.createTextNode(itemDescription);
  var itemDescText = document.createElement("p");
  if (descText === null || descText === undefined || descText.length === 0) {
    descText = "No Description";
  }
  itemDescText.appendChild(descText);

  // Append Item Desc Div Text
  itemDescDiv.appendChild(itemPriceText);
  itemDescDiv.appendChild(itemDescText);

  // Append all divs to Menu item divs
  menuItemDiv.appendChild(itemNameDiv);
  menuItemDiv.appendChild(itemDescDiv);

  // Append to a type list
  if (itemType === "Drink") {
    document.getElementById("drinkList").appendChild(menuItemDiv);
  } else {
    document.getElementById("foodList").appendChild(menuItemDiv);
  }
}
