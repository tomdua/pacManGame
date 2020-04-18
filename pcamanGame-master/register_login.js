    $("#registrationForm").validate({
            rules: {
                userName: {
                required: true,
                unique: true
            },
            userPassword: {
                required: true,
                minlength: 8,
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
            day: {
                required: true
            },
            month: {
                required: true
            },
            year: {
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
                minlength: "Your password must be at least 8 characters long",
                passwordCheck: "Must contain at least one numeric and one alphabetic character"
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
            day:{
                required: "Please enter your email"
            },
            month:{
                required: "Please enter your email"
            },
            year:{
                required: "Please enter your email"
            }
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
            day.value="Day";
            month.value="Month";
            year.year="Year";
            alert("You registered successfuly!");
            return show('login','setting','about','welcome','register');           
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
    var name = document.getElementById("userNameLogin");
    var password = document.getElementById("passwordLogin");
    for (i = 0; i < users.length; i++) {
        if (users[i]["userName"] == name.value && users[i]["password"] == password.value) {
            currentUser = users[i];
            $("#enterName").text(name.value);
            name.value="";
             password.value="";
            return show('setting','welcome','register','login');
            }          
    }
    
    alert("User name or password incorrect! Try again");
}

$("#datepicker").datepicker({
    showOn: "button",
    buttonImage: "http://jqueryui.com/demos/images/calendar.gif",
    buttonImageOnly: true,
    onSelect: function(dateText, inst) {
        //dateText comes in as MM/DD/YY
        var datePieces = dateText.split('/');
        var month = datePieces[0];
        var day = datePieces[1];
        var year = datePieces[2];
        //define select option values for
        //corresponding element
        $('select#month').val(month);
        $('select#day').val(day);
        $('select#year').val(year);

    }
});
function restFunction() {
    document.getElementById("registrationForm").reset();
  }
  function restFunction1() {
    document.getElementById("loginForm").reset();
  }


/*function addDateOptions() {
    var day = document.getElementById('day');
    var option = document.createElement('option')
    option.value = "Day";
    option.innerHTML = "Day";
    day.appendChild(option);

    for(var i = 0; i < 31; i++){
        var option = document.createElement('option')
        option.value = i + 1;
        option.innerHTML= i + 1;
        day.appendChild(option);
    }
    var month = document.getElementById('month');
    var option = document.createElement('option')
    option.value = "Month";
    option.innerHTML = "Month";
    month.appendChild(option);

    for(var i = 0; i < 12; i++){
        var option = document.createElement('option')
      option.value =  i + 1;
        option.innerHTML= i + 1;
        month.appendChild(option);
    }
    var year = document.getElementById('year');
    var option = document.createElement('option')
    option.value = "Year";
    option.innerHTML = "Year";
    year.appendChild(option);
    for(var i = 2020; i > 1940; i--){
        var option = document.createElement('option')
        option.value = i;
        option.innerHTML = i;
        year.appendChild(option);
    }        
}*/
