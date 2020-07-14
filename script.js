// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA14YFDgMaRJRUDGSbCPMl8RjWv8uY25Hw",
  authDomain: "the-white-board.firebaseapp.com",
  databaseURL: "https://the-white-board.firebaseio.com",
  projectId: "the-white-board",
  storageBucket: "the-white-board.appspot.com",
  messagingSenderId: "631108540394",
  appId: "1:631108540394:web:ae43ec42e8ad5ef5578493",
  measurementId: "G-QDR50XHW7T"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();



var user;
var msg;
var mycur;

//read from firebase and update message box
database.ref('message').on('value', (snap) => {
  msg = snap.val();
  document.getElementById("myInput").value = msg;
});

var hisOldCur=-1;
//active user updater
database.ref('username').on('value', (snap) => {
  document.getElementById("activeUsers").innerHTML = '';

  snap.forEach(function(childSnapshot) {

    if (childSnapshot.val().status == 1 && childSnapshot.val().name != user) {
      document.getElementById("activeUsers").innerHTML = document.getElementById("activeUsers").innerHTML + "<br>" + childSnapshot.val().name + ' ' + childSnapshot.val().cur;
      // 
      // //live cursor
      // var hisNewCur=childSnapshot.val().cur;
      // msg=transformString(msg,hisOldCur,hisNewCur);
      // hisOldCur=hisNewCur;
      // document.getElementById("myInput").value = msg;
      // document.getElementById("myInput").selectionEnd=mycur;

    }
  })
});


function init() {
  document.getElementById("username").disabled = true;
  document.getElementById("myInput").disabled = false;
  user = document.getElementById("username").value;
  var mycur = document.getElementById("myInput").selectionStart;
  database.ref("username/" + user).set({
    'name': user,
    'cur': mycur,
    'status': 1
  });

};


function exit() {
  user = document.getElementById("username").value;
  database.ref("username/" + user + "/status").set(0);
  database.ref("username/" + user + "/cur").set(0);
  document.getElementById("username").disabled = false;
  document.getElementById("myInput").disabled = true;
  document.getElementById("username").value = '';
};

function keyPress() {

  msg = document.getElementById("myInput").value;
  database.ref('message').set(msg);

  //database.ref("username").set(document.getElementById("myInput").selectionStart);
  //database.ref('curEnd').set(document.getElementById("myInput").selectionEnd);

  mycur = document.getElementById("myInput").selectionStart;
  database.ref("username/" + user + "/cur").set(mycur);

};

function transformString(message,oldcur,newcur)
{
  var newmsg;
  //remove from old
  if(oldcur != -1)
    message=message.substring(0,oldcur)+message.substring(oldcur+1);
  //add to newcur
  newmsg=message.substring(0,newcur)+"|"+message.substring(newcur);

  //return new
  return newmsg;

};
