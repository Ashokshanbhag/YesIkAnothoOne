//YOUR FIREBASE LINKS
var firebaseConfig = {
  apiKey: "AIzaSyDwesF9EsN96_xBVTtWgsecISv4GlB69og",
  authDomain: "kwitterclass2.firebaseapp.com",
  databaseURL: "https://kwitterclass2-default-rtdb.firebaseio.com",
  projectId: "kwitterclass2",
  storageBucket: "kwitterclass2.appspot.com",
  messagingSenderId: "629536464865",
  appId: "1:629536464865:web:6d7bffaa3628b5f1527ca0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("username");
room_name = localStorage.getItem("room_name");

function send(){

      msg = document.getElementById("message").value;
      firebase.database().ref(room_name).push({

             name:username,
             message:msg,
             like:0 

      });
      document.getElementById("message").value = "";

}

function getData() {
  firebase.database().ref("/" + room_name).on('value', function(snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function(childSnapshot) {
          childKey = childSnapshot.key;
          childData = childSnapshot.val();
          if (childKey != "purpose") {
              firebase_message_id = childKey;
              message_data = childData;
              //Start code
              console.log(firebase_message_id);
              console.log(message_data);
              name = message_data['name'];
              message = message_data['message'];
              like = message_data['like'];
              name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png' style='width: 20px height: 20px;'></h4>";
              message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
              like_button = "<button id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
              span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

              row = name_with_tag + message_with_tag + like_button + span_with_tag;
              document.getElementById("output").innerHTML += row;
              //End code
          }
      });
  });
}
getData();


function updateLike(message_id){

  console.log(message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  likes_in_number = Number(likes) + 1 ;
  console.log("The no. of likes are" + likes_in_number);
  firebase.database().ref(room_name).child(message_id).update({

    like: likes_in_number

  });

}

function logOut(){

  localStorage.removeItem("username");
  localStorage.removeItem("room_name");

  window.location.replace("index.html");

}