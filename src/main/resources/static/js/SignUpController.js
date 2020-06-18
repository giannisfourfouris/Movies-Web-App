function signUpUserr() {

    let email = $("#signUpemail").val();
    let password = $("#signUpPassword").val();
    if (validateEmail(email) && password.length>=6 ){
        $.ajax({
            contentType: 'application/json',
            data: JSON.stringify({"email": email, "password":password}),
            dataType: 'json',
            processData: false,
            type: 'POST',
            url: '/signUp'
        });
    window.location.href='/signIn';
    } else {
        alert('Please give valid fields!');
        document.getElementById("signUpemail").value="";
        document.getElementById("signUpPassword").value="";
    }



}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}



