let sendBtn = document
  .getElementById("sendBtn")
  .addEventListener("click", () => {
    let firstName = document.getElementById("firstName").value;
    let requestAPI = fetch("https://api.agify.io/?name=" + firstName);
    requestAPI
      .then((response) => response.json())
      .then((data) => jsonToPrint(data));
  });

function jsonToPrint(jsonObject) {
  let screen = document.getElementById("screen");
  screen.innerText = jsonObject.age;
}
