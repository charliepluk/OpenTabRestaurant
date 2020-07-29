function openPopup(
  orderID,
  customerFirstname,
  orderDateTime,
  orderItems,
  totalOrderPrice
) {
  document.getElementById("popupOrderID").innerHTML = "Order#" + orderID;
  document.getElementById("popupOrderCustomer").innerHTML =
    "Customer: " + customerFirstname;
  document.getElementById("popupOrderDateTime").innerHTML =
    getDateText(orderDateTime) + ", " + getTimeText(orderDateTime);
  document.getElementById("popupOrderTotal").innerHTML =
    "$" + totalOrderPrice.toFixed(2);

  var itemsListDiv = document.getElementById("popupOrderedItemsList");
  var itemsObject = JSON.parse(orderItems);
  for (var i = 0; i < itemsObject.length; i++) {
    var itemName = itemsObject[i].itemName;
    var quantity = itemsObject[i].quantity;
    var totalPrice = itemsObject[i].totalPrice;

    var itemTextNode = document.createTextNode(
      quantity + "x " + itemName + " "
    );
    var itemText = document.createElement("p");
    itemText.appendChild(itemTextNode);

    var itemPriceNode = document.createTextNode("$" + totalPrice.toFixed(2));
    var itemPriceSpan = document.createElement("span");
    itemPriceSpan.classList.add("popupItemPriceSpan");
    itemPriceSpan.appendChild(itemPriceNode);

    itemText.appendChild(itemPriceSpan);
    itemsListDiv.appendChild(itemText);
  }

  document.getElementById("invoicePopup").style.display = "flex";
}

function closePopup() {
  document.getElementById("invoicePopup").style.display = "none";
  document.getElementById("popupOrderID").innerHTML = "";
  document.getElementById("popupOrderCustomer").innerHTML = "";
  document.getElementById("popupOrderDateTime").innerHTML = "";
  document.getElementById("popupOrderTotal").innerHTML = "";

  const itemsListDiv = document.getElementById("popupOrderedItemsList");
  while (itemsListDiv.lastElementChild) {
    itemsListDiv.removeChild(itemsListDiv.lastElementChild);
  }
}
