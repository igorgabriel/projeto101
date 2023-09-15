const firebaseConfig = {
  apiKey: "AIzaSyAEsL1PrW4r0lOG_Z-deWVXIMcRlm340Tc",
  authDomain: "kwitter-e62e2.firebaseapp.com",
  databaseURL: "https://kwitter-e62e2-default-rtdb.firebaseio.com",
  projectId: "kwitter-e62e2",
  storageBucket: "kwitter-e62e2.appspot.com",
  messagingSenderId: "847525749883",
  appId: "1:847525749883:web:170f56ba5db00f6edceede",
};

firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML =
  "Bem-vindo(a), " + user_name + "!";

function addRoom() {
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose: "adicionando nome da sala",
  });

  localStorage.setItem("room_name", room_name);

  window.location = "kwitter_page.html";
}

function getData() {
  firebase
    .database()
    .ref("/")
    .on("value", function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        Room_names = childKey;
        console.log("Nome da sala: " + Room_names);
        row =
          "<div class='room_name' id=" +
          Room_names +
          " onclick='redirectToRoomName(this.id)' >" +
          Room_names +
          "</div><hr>";
        document.getElementById("output").innerHTML += row;
      });
    });
}

getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}
