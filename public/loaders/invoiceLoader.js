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
        var orderStatus = result[i].orderStatus;
        var orderItems = result[i].orderItems;
        var totalOrderPrice = result[i].totalOrderPrice;
        var customerFirstname = result[i].customerFirstname;

        if (orderStatus !== "pending") {
          createItem(
            orderID,
            customerID,
            orderNotes,
            orderDateTime,
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

function createItem(
  orderID,
  customerID,
  orderNotes,
  orderDateTime,
  orderItems,
  totalOrderPrice,
  customerFirstname
) {
  // Create DIV to hold new menu item
  var invoiceItemDiv = document.createElement("div");
  invoiceItemDiv.classList.add("invoice-item");
  invoiceItemDiv.id = orderID;
  invoiceItemDiv.onclick = function () {
    openPopup(
      orderID,
      customerFirstname,
      orderDateTime,
      orderItems,
      totalOrderPrice
    );
  };

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

  var totalText = document.createTextNode(
    "Total: $" + totalOrderPrice.toFixed(2)
  );
  var invoiceTotalText = document.createElement("h5");
  invoiceTotalText.appendChild(totalText);
  invoiceTotalDiv.appendChild(invoiceTotalText);

  // Create invoice item total
  var invoiceDateDiv = document.createElement("div");
  invoiceDateDiv.classList.add("invoice-item-date");

  var dateText = document.createTextNode("Date: " + getDateText(orderDateTime));
  var invoiceDateText = document.createElement("h5");
  invoiceDateText.appendChild(dateText);
  invoiceDateDiv.appendChild(invoiceDateText);

  var timeText = document.createTextNode("Time: " + getTimeText(orderDateTime));
  var invoiceTimeText = document.createElement("h5");
  invoiceTimeText.appendChild(timeText);
  invoiceDateDiv.appendChild(invoiceTimeText);

  // Append all divs to invoice item divs
  invoiceItemDiv.appendChild(orderIdDiv);
  invoiceItemDiv.appendChild(invoiceTotalDiv);
  invoiceItemDiv.appendChild(invoiceDateDiv);

  document.getElementById("invoiceList").prepend(invoiceItemDiv);
}
