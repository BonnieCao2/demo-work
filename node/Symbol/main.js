// import Login from './a'
let Login =  require('./a').Login

const login = new Login('admin', '123456')

//login.checkPassword('123456')  // true
console.log(login.checkPassword('123456'))// true

// login.PASSWORD  // oh!no!
// login[PASSWORD] // oh!no!
// login["PASSWORD"] // oh!no!

console.log(login["username"])//admin
console.log(login.PASSWORD)//undefined
console.log(login["PASSWORD"])//undefined
console.log(login[PASSWORD])//PASSWORD is not defined