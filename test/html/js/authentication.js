const btnLogin = document.getElementById('btnLogin')
const inputEmail = document.getElementById('inputEmail')
const inputPassword = document.getElementById('inputPassword')

var userTokenFirebaseAuthentication = ''

btnLogin.addEventListener('click', function(){
    const email = inputEmail.value
    const password = inputPassword.value

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(result){
        console.log(result.user.ra)
        console.log(result.user.email)
        console.log(result.user.uid)

        userTokenFirebaseAuthentication = result.user.ra
    })
    .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
        console.log(error)
    });
})