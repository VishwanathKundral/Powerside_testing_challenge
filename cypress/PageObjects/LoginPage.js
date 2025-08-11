class Login
{
    /**
     * It have variables for locator related to login operations
     * respective methods to act on it
     */

    userNameField="#username";
    passwordField="input#password"
    loginButton="button[name='submit']"
    errorMessage="#flash_danger"

    enterUserName(userName){
        cy.get(this.userNameField).clear().type(userName)
    }

    enterpassword(password){
        cy.get(this.passwordField).clear().type(password)
    }

    attemptLogin(){
        cy.get(this.loginButton).click()
    }

    getErrorMessage(){
        return cy.get(this.errorMessage)
    }

    enterSpecialCharPassword(password){
        cy.get(this.passwordField).clear().type(password, {
                parseSpecialCharSequences: false,
              })
    }
}

export default Login