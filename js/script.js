var nameInput = document.getElementById('usernameInput');
var emailInput = document.getElementById('userEmailInput');
var passwordInput = document.getElementById('userPasswordInput');
var ArrayofInputs;

if (localStorage.getItem("users") == null) {
    ArrayofInputs = [];

} else {
    ArrayofInputs = JSON.parse(localStorage.getItem("users"))
}

function signUp() {
    userInputValidation();
    IsExist();
    if (userInputValidation() == true && IsExist() == false) {
        var Inputs = {
            username: nameInput.value,
            useremail: emailInput.value,
            userpassword: passwordInput.value,
        };
        ArrayofInputs.push(Inputs);
        localStorage.setItem("users", JSON.stringify(ArrayofInputs));

        var confirmMsg = document.getElementById('confirmMsg')
        confirmMsg.classList.replace('d-none', 'd-block')

        var signup = document.getElementById('signupBtn')
        signup.classList.replace('d-none', "d-block")

    } else {

        var tryAagain = document.getElementById('tryAgainMsg')
        tryAagain.classList.replace('d-none', 'd-block')
    }


}

function usernameValidation() {

    var usernameAlert = document.getElementById("usernameAlert");
    var regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/;
    if (regex.test(nameInput.value) == true && nameInput.value != "") {
        nameInput.classList.add('is-valid');
        nameInput.classList.remove('is-invalid');
        usernameAlert.classList.replace("d-block", "d-none");
        return true;
    } else {
        nameInput.classList.add('is-invalid');
        nameInput.classList.remove('is-valid');
        usernameAlert.classList.replace("d-none", "d-block");
        return false;
    }


}

function userEmailVlidation() {
    var userEmailAlert = document.getElementById("userEmailAlert");
    var regex = /^[a-zA-Z0-9](?!.*[\!\#\$\%\&\'\*\+\/\=\?\^\_\\{\|\}\~\.\-]{2})([\!\#\$\%\&\'\*\+\/\=\?\^\_\\{\|\}\~\.\-]*[a-zA-Z0-9]){1,64}@[a-zA-Z0-9-]{1,253}(\.[a-zA-Z0-9-]{2,})*$/;
    if (regex.test(emailInput.value) == true && emailInput.value != "") {
        emailInput.classList.add('is-valid');
        emailInput.classList.remove('is-invalid');
        userEmailAlert.classList.replace("d-block", "d-none");
        return true;
    } else {
        emailInput.classList.add('is-invalid');
        emailInput.classList.remove('is-valid');
        userEmailAlert.classList.replace("d-none", "d-block");
        return false;
    }
}

function userpasswordValidation() {
    var userPasswordAlert = document.getElementById("userPasswordAlert");
    var regex = /^.{5,15}$/;
    if (regex.test(passwordInput.value) == true && passwordInput.value != "") {
        passwordInput.classList.add('is-valid');
        passwordInput.classList.remove('is-invalid');
        userPasswordAlert.classList.replace("d-block", "d-none");
        return true;
    } else {
        passwordInput.classList.add('is-invalid');
        passwordInput.classList.remove('is-valid');
        userPasswordAlert.classList.replace("d-none", "d-block");
        return false;
    }
}

function userInputValidation() {
    usernameValidation()
    userpasswordValidation()
    userEmailVlidation()

    if (usernameValidation() == true && userpasswordValidation() == true && userEmailVlidation() == true) {
        return true;
    }
    else {
        return false;
    }
}

function IsExist() {
    var accountExistMsg = document.getElementById("accountExistMsg");
    if (ArrayofInputs.lenght) {


        for (var i = 0; i < ArrayofInputs.length; i++)
            if (ArrayofInputs[i].nameInput.toLowerCase() == nameInput.value.toLowerCase() ||
                ArrayofInputs[i].emailInput.toLowerCase() == emailInput.value.toLowerCase()) {

                nameInput.classList.remove('is-valid');
                emailInput.classList.remove("is-valid");
                accountExistMsg.classList.replace("d-none", "d-block");
                return true;

            }
    }
    return false
}


var username = localStorage.getItem('sessionUsername');
function login() {
    var loginEmail = document.getElementById('loginEmail');
    var loginPassword = document.getElementById('loginPassword');
    var loginBtn = document.getElementById("loginBtn");
    var wrongMsg = document.getElementById("wrongMsg");



    if (loginEmail.value == "" || loginPassword.value == "") {
        var fillMsg = document.getElementById('fillMsg')
        fillMsg.classList.replace("d-none", "d-block")
        return false;

    }
    var userIxist = false;

    for (var i = 0; i < ArrayofInputs.length; i++) {

        if (ArrayofInputs[i].useremail.toLowerCase() == loginEmail.value.toLowerCase() &&
            ArrayofInputs[i].userpassword.toLowerCase() == loginPassword.value.toLowerCase()) {

            localStorage.setItem("sessionUsername", ArrayofInputs[i].username)
            loginBtn.setAttribute("href", "welcome.html")

            userIxist = true;
        }

    }
    if (!userIxist) {

        wrongMsg.classList.replace("d-none", "d-block")


    }
}


function displayWelcomeUser() {
    document.getElementById("username").innerHTML = "Welcome " + username
}

function logout() {
    localStorage.removeItem('sessionUsername')
    window.location.href = "signup.html"
}






