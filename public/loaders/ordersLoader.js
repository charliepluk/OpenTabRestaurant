// Display orders on page load
loadOrders();

// Function to Load Invoice items
function loadOrders() {
  var handler = "/orders/query";
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      result = JSON.parse(this.response);

      for (var i = 0; i < result.length; i++) {
        var orderID = result[i].orderID;
        var customerID = result[i].customerID;
        var orderNotes = result[i].orderNotes;
        var orderDateTime = result[i].orderDateTime;
        var orderStatus = result[i].orderStatus;
        var orderItems = result[i].orderItems;
        var totalOrderPrice = result[i].totalOrderPrice;
        var customerFirstname = result[i].customerFirstname;

        if (orderStatus !== "completed") {
          createItem(
            orderID,
            customerID,
            orderNotes,
            orderDateTime,
            orderStatus,
            orderItems,
            totalOrderPrice,
            customerFirstname
          );
        }
      }
    }
  };

  xhr.open("GET", handler);
  xhr.send();
}

// Function to Load Invoice items
function updateOrder(orderID, statusToSet) {
  var jsonOBJ = {
    orderID: orderID,
    orderStatus: statusToSet,
  };

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/orders/update", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    // Call a function when the state changes.
    if (this.readyState === 4 && this.status === 200) {
      window.location = "orders";
    }
  };
  xhr.send(JSON.stringify(jsonOBJ));
}

function createItem(
  orderID,
  customerID,
  orderNotes,
  orderDateTime,
  orderStatus,
  orderItems,
  totalOrderPrice,
  customerFirstname
) {
  // Create DIV to hold new menu item
  var orderItemDiv = document.createElement("div");
  orderItemDiv.classList.add("order-item");

  // Create order id div
  var orderIdDiv = document.createElement("div");
  orderIdDiv.classList.add("order-id");
  var orderIdTextNode = document.createTextNode("Order#" + orderID);
  var orderIdText = document.createElement("h3");
  orderIdText.appendChild(orderIdTextNode);
  orderIdDiv.appendChild(orderIdText);

  // Create customer name div
  var customerNameDiv = document.createElement("div");
  customerNameDiv.classList.add("customer-name");
  var customerNode = document.createTextNode(customerFirstname);
  var customerNameText = document.createElement("h4");
  customerNameText.appendChild(customerNode);
  customerNameDiv.appendChild(customerNameText);

  // Create ordered items div
  var orderedItemsDiv = document.createElement("div");
  orderedItemsDiv.classList.add("ordered-items");
  var orderedItemsTitleNode = document.createTextNode("Ordered Items:");
  var orderedItemsTitle = document.createElement("h4");
  orderedItemsTitle.appendChild(orderedItemsTitleNode);
  orderedItemsDiv.appendChild(orderedItemsTitle);

  // Create list of items
  var orderedItemsListDiv = document.createElement("div");
  orderedItemsListDiv.classList.add("ordred-items-list");

  var itemsObject = JSON.parse(orderItems);
  for (var i = 0; i < itemsObject.length; i++) {
    var itemName = itemsObject[i].itemName;
    var quantity = itemsObject[i].quantity;

    var itemTextNode = document.createTextNode(quantity + "x " + itemName);
    var itemText = document.createElement("p");
    itemText.appendChild(itemTextNode);
    orderedItemsListDiv.appendChild(itemText);
  }
  orderedItemsDiv.appendChild(orderedItemsListDiv);

  // Create order total
  var totalDiv = document.createElement("div");
  totalDiv.classList.add("order-total");
  var totalTextNode = document.createTextNode(
    "Total: $" + totalOrderPrice.toFixed(2)
  );
  var totalText = document.createElement("h4");
  totalText.appendChild(totalTextNode);
  totalDiv.appendChild(totalText);
  orderedItemsDiv.appendChild(totalDiv);

  // // Create order note
  // var noteDiv = document.createElement("div");
  // noteDiv.classList.add("order-note");
  // var noteTitleNode = document.createTextNode("Note:");
  // var noteTitleText = document.createElement("h4");
  // noteTitleText.appendChild(noteTitleNode);
  // noteDiv.appendChild(noteTitleText);
  // var noteNode = document.createTextNode(orderNotes);
  // var noteText = document.createElement("p");
  // noteText.appendChild(noteNode);
  // noteDiv.appendChild(noteText);

  // Create control button
  var controlDiv = document.createElement("div");
  controlDiv.classList.add("control-order");

  if (orderStatus === "pending") {
    controlDiv.onclick = function () {
      updateOrder(orderID, "current");
    };
    var controlTextNode = document.createTextNode("START ORDER");
  } else {
    controlDiv.onclick = function () {
      updateOrder(orderID, "completed");
    };
    var controlTextNode = document.createTextNode("FINISH ORDER");
  }
  var controlText = document.createElement("h3");
  controlText.appendChild(controlTextNode);
  controlDiv.appendChild(controlText);

  // Append all divs to invoice item divs
  orderItemDiv.appendChild(orderIdDiv);
  orderItemDiv.appendChild(customerNameDiv);
  orderItemDiv.appendChild(orderedItemsDiv);
  //orderItemDiv.appendChild(noteDiv);
  orderItemDiv.appendChild(controlDiv);

  if (orderStatus === "pending") {
    document.getElementById("pendingSection").appendChild(orderItemDiv);
  } else {
    document.getElementById("currentSection").appendChild(orderItemDiv);
  }
}
