function openAccountEdit(openTime, closeTime, description) {
  document.getElementById("editOpenTime").value = openTime;
  document.getElementById("editCloseTime").value = closeTime;
  document.getElementById("editAccountDesc").value = description;
  document.getElementById("editAccountForm").style.display = "flex";
}

function closeAccountEdit() {
  document.getElementById("editAccountForm").style.display = "none";
}
