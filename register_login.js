$("#registrationForm").validate({
    rules: {
        userName: {
        required: true,
        unique: true
    },
    
    userPassword: {
        required: true,
        minlength: 6,
        passwordCheck: true
    },
    userFirstName: {
        required: true,
        lettersonly: true
    },
    userLastName: {
        required: true,
        lettersonly: true
    },
    userEmail: {
        required: true,
        email: true
    },
    birthdate: {
        required: true
    },
},
messages: {
    userName: {
        required: "Please enter your user name",
        unique:"User name already being used"
     },
    userPassword: {
        required: "Please provide a password",
        minlength: "Your password must be at least 6 characters long",
        passwordCheck: "At least one numeric and one alphabetic"
    },
    userFirstName: {
        required: "Please enter your first name",
        lettersonly: "Please enter a valid first name, letters only"
    },
    userLastName: {
        required: "Please enter your last name",
        lettersonly: "Please enter a valid last name, letters only"
    },
    
    userEmail: {
        required: "Please enter your email",
        email: "Please enter a valid email address"
    },
    birthdate:{
        required: "Please enter your birthdate"
    },
},        
submitHandler: function(form) {
    var uName = document.getElementById("userName");
    var uPass = document.getElementById("userPassword");   
    var user = {userName: uName.value, password: uPass.value}// firstName: ufName.value, lastName: ulName.value, Email: uEmail.value, day: uDay.value, month: uMonth.value, year: uYear.value};
    users.push(user);
    userName.value="";
    userPassword.value="";
    userFirstName.value="";
    userLastName.value="";
    userEmail.value="";
    alert("You registered successfuly!");
    show('login');           
}
});


$.validator.addMethod('passwordCheck', function(value, element) {
return this.optional(element) || (value.match(/[a-zA-Z]/) && value.match(/[0-9]/));
});

jQuery.validator.addMethod("unique", function (value, element) {
for (var i = 0; i < users.length; i++) {
if (users[i].userName == value)
    return false;
}
return true;
});

/*function RegisterUserFunction() {

}*/


function validateLogin(){
var found = false;
var name = document.getElementById("userNameLogin");
var password = document.getElementById("passwordLogin");
for (i = 0; i < users.length; i++) {
if (users[i]["userName"] == name.value && users[i]["password"] == password.value) {
    currentUser = users[i];
    $("#enterName").text(name.value);
    found=true;
    name.value="";
    password.value="";
    show('setting'); 
    }          
}
if(found === false) 
    alert("User name or password incorrect! Try again");
}

function restFunction() {
document.getElementById("registrationForm").reset();
}