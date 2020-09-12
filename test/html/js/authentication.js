const btnLogin = document.getElementById('btnLogin')
const inputEmail = document.getElementById('inputEmail')
const inputPassword = document.getElementById('inputPassword')

// eslint-disable-next-line no-unused-vars
var userTokenFirebaseAuthentication = ''

btnLogin.addEventListener('click', function () {
  const email = inputEmail.value
  const password = inputPassword.value

  // eslint-disable-next-line no-undef
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (result) {
      console.log(result.user.ra)
      console.log(result.user.email)
      console.log(result.user.uid)

      userTokenFirebaseAuthentication = result.user.ra
    })
    .catch(function (error) {
      // Handle Errors here.
      // ...
      console.log(error)
    })
})
