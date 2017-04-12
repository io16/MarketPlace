/**
 * Created by igor on 01.03.17.
 */
function validation(obj) {
    var objName = obj.getAttribute('name')

    var objValue = obj.value;
    var incorrectChars = ["%", "'", '"', "$", "~", "#"];

    var validationStatus = false;
    if (objValue.length >= 3) {
        validationStatus = true;

        for (var i = 0; i < objValue.length && validationStatus; i++) {
            for (var j = 0; j < incorrectChars.length; j++) {


                if (objValue.indexOf(incorrectChars[j]) != -1) {
                    validationStatus = false;
                    break;

                }
            }
        }
    }

    var objSpan = document.getElementById(objName + "Span");
    if (validationStatus) {

        objSpan.className = "fontawesome-check";
    }
    else
        objSpan.className = "fa fa-times";

    return validationStatus
}

function passCorrect() {
    var objSpan = document.getElementById("passSpan2");
    if (document.getElementsByName("pass")[1].value == document.getElementsByName("pass")[0].value) {
        objSpan.className = "fontawesome-check";
    }
    else
        objSpan.className = "fa fa-times";
    return (document.getElementsByName("pass")[1].value == document.getElementsByName("pass")[0].value)
}
function emailValidation(obj) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var objSpan = document.getElementById(obj.getAttribute('name') + "Span");
    if (re.test(obj.value)) {
        objSpan.className = "fontawesome-check";
    }
    else
        objSpan.className = "fa fa-times";
    return re.test(obj.value)
}
function createUser() {
    var login = document.getElementsByName('login')[0];
    var pass = document.getElementsByName('pass')[0];
    var name = document.getElementsByName('firstName')[0];
    var email = document.getElementsByName('email')[0];
    if (emailValidation(email) && validation(name) && validation(login) && validation(pass) && passCorrect()) {
        var obj = new Object();
        obj.login = login.value;
        obj.name = name.value;
        obj.email = email.value;
        obj.pass = pass.value;

        $.post("/user", {
                data: JSON.stringify(obj)
            }, function (data) {

                if (data == "true") {
                    alert("user created")
                } else {
                    alert("user don`t create ")
                }
            }
        )
    } else {
        alert("incorrect user")
    }

}


/**
 * Created by igor on 01.03.17.
 */
var userToken
function login() {
    var login = document.getElementById("loginInput").value
    var password = document.getElementById("passwordInput").value
    $.ajax
    ({
        type: "POST",
        url: "/login",
        dataType: 'json',
        async: false,
        // headers: {
        //     "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9uIFNub3ciLCJhZG1pbiI6dHJ1ZSwiZXhwIjoxNDkwMzYxMzg4fQ.AUp-oA5HXLojnrsnrmTHbWlZBduJs69osZEVh3ZfBfw"
        // },
        data: {
            username: login,
            password: password
        },
        success: function (token) {
            $(function() {
                $.session.set("token", token.token);
            });
            setTimeout(function () {

            },100)

        }

    });

}

function mainRedirect() {

}



// To Read
function getSessionToken() {
    return $.session.get("token");
}
function test() {
    $.ajax
    ({
        type: "GET",
        url: "/restricted/test",

        headers: {
            "Authorization": "Bearer " + getSessionToken()
        },

        success: function (r) {

            document.write(r)
        }
    });

}
