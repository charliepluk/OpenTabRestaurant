// Display account info on page load
loadAccountInfo();

// Function to Load Invoice items
function loadAccountInfo() {
  var handler = "/account/query";
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      result = JSON.parse(this.response);

      for (var i = 0; i < result.length; i++) {
        var restName = result[i].restName;
        var firstName = result[i].firstName;
        var lastName = result[i].lastName;
        var phone = result[i].phone;
        var email = result[i].email;
        var address = result[i].address;
        var state = result[i].state;
        var city = result[i].city;
        var zipcode = result[i].zipcode;
        var description = result[i].description;
        var openTime = result[i].openTime;
        var closeTime = result[i].closeTime;

        createItem(
          restName,
          firstName,
          lastName,
          phone,
          email,
          address,
          state,
          city,
          zipcode,
          description,
          openTime,
          closeTime
        );
      }
    }
  };

  xhr.open("GET", handler);
  xhr.send();
}

function createItem(
  restName,
  firstName,
  lastName,
  phone,
  email,
  address,
  state,
  city,
  zipcode,
  description,
  openTime,
  closeTime
) {
  // Create DIV to hold restaurant info item
  var restInfoDiv = document.createElement("div");

  // Create a div to hold restaurant name
  var restNameDiv = document.createElement("div");
  restNameDiv.classList.add("restaurant-name");

  var restNameNode = document.createTextNode(restName);
  var restNameText = document.createElement("h3");
  restNameText.appendChild(restNameNode);
  restNameDiv.appendChild(restNameText);

  // Create DIV to hold restaurant email
  var restEmailDiv = document.createElement("div");
  restEmailDiv.classList.add("restaurant-email");

  var emailTitleNode = document.createTextNode("Email:");
  var emailTitleText = document.createElement("h4");
  var emailNode = document.createTextNode(email);
  var emailText = document.createElement("p");
  emailTitleText.appendChild(emailTitleNode);
  emailText.appendChild(emailNode);
  restEmailDiv.appendChild(emailTitleText);
  restEmailDiv.appendChild(emailText);

  // Div to hold restaurant phone
  var restPhoneDiv = document.createElement("div");
  restPhoneDiv.classList.add("restaurant-phone");

  var phoneTitleNode = document.createTextNode("Phone:");
  var phoneTitleText = document.createElement("h4");
  var phoneNode = document.createTextNode(phone);
  var phoneText = document.createElement("p");
  phoneTitleText.appendChild(phoneTitleNode);
  phoneText.appendChild(phoneNode);
  restPhoneDiv.appendChild(phoneTitleText);
  restPhoneDiv.appendChild(phoneText);

  // Div to hold restaurant location
  var restLocationDiv = document.createElement("div");
  restLocationDiv.classList.add("restaurant-location");

  var locationTitleNode = document.createTextNode("Address:");
  var locationTitleText = document.createElement("h4");
  var addressNode = document.createTextNode(address);
  var addressText = document.createElement("p");
  var cityStateNode = document.createTextNode(
    city + ", " + state + " " + zipcode
  );
  var cityStateText = document.createElement("p");
  locationTitleText.appendChild(locationTitleNode);
  addressText.appendChild(addressNode);
  cityStateText.appendChild(cityStateNode);
  restLocationDiv.appendChild(locationTitleText);
  restLocationDiv.appendChild(addressText);
  restLocationDiv.appendChild(cityStateText);

  // Div to hold restaurant phone
  var restDescDiv = document.createElement("div");
  restDescDiv.classList.add("restaurant-desc");

  var descTitleNode = document.createTextNode("Description:");
  var descTitleText = document.createElement("h4");
  var descNode = document.createTextNode(description);
  var descText = document.createElement("p");
  descTitleText.appendChild(descTitleNode);
  descText.appendChild(descNode);
  restDescDiv.appendChild(descTitleText);
  restDescDiv.appendChild(descText);

  // Append all divs to invoice item divs
  restInfoDiv.appendChild(restNameDiv);
  restInfoDiv.appendChild(restEmailDiv);
  restInfoDiv.appendChild(restPhoneDiv);
  restInfoDiv.appendChild(restLocationDiv);
  restInfoDiv.appendChild(restDescDiv);

  document.getElementById("restaurantInfo").prepend(restInfoDiv);
}
