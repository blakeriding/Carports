 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyDmz9ONgd8eze-0uovolhMCjf3Jztzt2-U",
    authDomain: "contactform-4ddb2.firebaseapp.com",
    databaseURL: "https://contactform-4ddb2.firebaseio.com",
    projectId: "contactform-4ddb2",
    storageBucket: "",
    messagingSenderId: "641048270708",
    appId: "1:641048270708:web:b79e3b5c08a51797"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  // Reference messages collection
  var messagesRef = firebase.database().ref('messages');
  messagesRef.on('value', gotData, errData);
  

  // Got data
  function gotData(data){
    var scores = data.val();
    var keys = Object.keys(scores);
    console.log(keys);
    for (var i = 0; i < keys.length; i++){
        var k = keys[i];
        var name = scores[k].name;
        var company = scores[k].company;
        var email = scores[k].email;
        var phone = scores[k].phone;
        var message = scores[k].message;
        //console.log(name, company, email, phone, message);
        var li = document.createElement('p')
        li.innerHTML = "<h4>" + name + "</h4>"+ "Sides closed: " + company + "<br>" + "Ends closed: " + email + "<br>" + "Extras: <br>" + message  + "<h5>" + "Price: $" + phone + "</h5>";
        document.body.appendChild(li);

    }
  }

  function errData(err){
    console.log('Error');
    console.log(err);
}
// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

//Submit phone
function submitForm(e){
    e.preventDefault();

    // Get values
    var name = getInputVal('name');
    var company = getInputVal('company');
    var email = getInputVal('email');
    var phone = getInputVal('phone');
    var message = getInputVal('message');
    
    // Save message
    saveMessage(name, company, email, phone, message);

    // Show alert
    document.querySelector('.alert').style.display = 'block';

    // Hide alert after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
    }, 3000);

    // Clear form
    document.getElementById('contactForm').reset();
}


// Function to get form values
function getInputVal(id){
    return document.getElementById(id).value;
}


// Save the mssaage to firebase
function saveMessage(name, company, email, phone, message){

    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        company: company,
        email: email,
        phone: phone,
        message: message
    });
}

