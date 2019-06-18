const PASSWORD = Symbol()

class Login {
    constructor(username, password) {
        this.username = username
        this[PASSWORD] = password
    }

    checkPassword(pwd) {
        return this[PASSWORD] === pwd
    }
}

// export default Login//Unexpected token export
module.exports = {Login}

