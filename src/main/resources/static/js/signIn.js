window.onload = (event) => {
    var myString = window.location.href;
    var parts = myString.split('/');
    var answer = parts[parts.length - 1];
    if (answer == "signIn?error") {
        alert("Wrong Username or Password!");
    }
    if (document.cookie) {
        hide()
    }
};

function hide() {
    var form = document.getElementById('formSignIn');
    form.style.display = 'none';
    var loggedIn = document.getElementById('loggedIn');
    loggedIn.style.display = 'block';
}