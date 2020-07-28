// Display invoice items on page load
loadInvoiceItems();

// Function to Load Invoice items
function loadInvoiceItems() {
  var handler = "/invoice/query";
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      result = JSON.parse(this.response);

      for (var i = 0; i < result.length; i++) {
        var orderID = result[i].orderID;
        var customerID = result[i].customerID;
        var orderNotes = result[i].orderNotes;
        var orderDateTime = result[i].orderDateTime;
        var orderItems = result[i].orderItems;

        createItem(orderID, customerID, orderNotes, orderDateTime, orderItems);
      }
    }
  };

  xhr.open("GET", handler);
  xhr.send();
}

function createItem(
  orderID,
  customerID,
  orderNotes,
  orderDateTime,
  orderItems
) {
  // Create DIV to hold new menu item
  var invoiceItemDiv = document.createElement("div");
  invoiceItemDiv.classList.add("invoice-item");
  invoiceItemDiv.id = orderID;
  invoiceItemDiv.onclick = openPopup;

  // Create invoice item order id div
  var orderIdDiv = document.createElement("div");
  orderIdDiv.classList.add("invoice-item-order-id");
  var orderIdTextNode = document.createTextNode("Order#" + orderID);
  var orderIdText = document.createElement("h3");
  orderIdText.appendChild(orderIdTextNode);
  orderIdDiv.appendChild(orderIdText);

  // Create invoice item total
  var invoiceTotalDiv = document.createElement("div");
  invoiceTotalDiv.classList.add("invoice-item-total");

  var totalText = document.createTextNode("Total: 20");
  var invoiceTotalText = document.createElement("h5");
  invoiceTotalText.appendChild(totalText);
  invoiceTotalDiv.appendChild(invoiceTotalText);

  // Create invoice item total
  var invoiceDateDiv = document.createElement("div");
  invoiceDateDiv.classList.add("invoice-item-date");

  var dateText = document.createTextNode(orderDateTime);
  var invoiceDateText = document.createElement("h5");
  invoiceDateText.appendChild(dateText);
  invoiceDateDiv.appendChild(invoiceDateText);

  // Append all divs to invoice item divs
  invoiceItemDiv.appendChild(orderIdDiv);
  invoiceItemDiv.appendChild(invoiceTotalDiv);
  invoiceItemDiv.appendChild(invoiceDateDiv);

  document.getElementById("invoiceList").appendChild(invoiceItemDiv);
}
