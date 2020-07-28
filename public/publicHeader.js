function sendPostRequest(jsonOBJ, handler) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", handler, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    // Call a function when the state changes.
    if (this.readyState === 4 && this.status === 200) {
    }
  };
  xhr.send(JSON.stringify(jsonOBJ));
}

function getCustomerInfo(customerID) {
  var handler = "/customer/query?customerID=" + customerID;
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      result = JSON.parse(this.response);
    }
    return result;
  };

  xhr.open("GET", handler);
  xhr.send();
}
