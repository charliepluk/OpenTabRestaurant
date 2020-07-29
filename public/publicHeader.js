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

function convertMilitaryToStandardTime(militaryTime) {
  militaryTime = militaryTime.split(":");
  if (militaryTime[0] > 12) {
    return militaryTime[0] - 12 + ":" + militaryTime[1] + " PM";
  } else if (militaryTime[0] == 12) {
    return militaryTime[0] + ":" + militaryTime[1] + " PM";
  } else if (militaryTime[0] == 0) {
    return 12 + ":" + militaryTime[1] + " AM";
  } else {
    return parseInt(militaryTime[0]) + ":" + militaryTime[1] + " AM";
  }
}

function getDateText(dateTimeText) {
  console.log(dateTimeText);
  dateText = dateTimeText.split("T")[0].split("-");
  return dateText[1] + "-" + dateText[2] + "-" + dateText[0];
}

function getTimeText(dateTimeText) {
  unformatedTimeText = dateTimeText.split("T")[1].split(".")[0];
  return convertMilitaryToStandardTime(unformatedTimeText);
}
