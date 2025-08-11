import HomePage from "../PageObjects/HomePage.js"
import Login from "../PageObjects/LoginPage.js"

describe("Login user tests", ()=>
{
    /**
     * Varibles for test cases
     * url - baseUrl to launch the website
     * userData - login userdetails for the website
     */
    let url, userData
    const loginPage = new Login()
    const homePage = new HomePage()

    /**
     * Load the data properties required for the test cases once before the execution
     * websites.json - can have multiple urls, for now it has baseUrl for login
     * loginUser.json - has multi user details, valid/in-valid
     */
    before( ()=>{
        cy.fixture("websites.json").then((data)=>{
        url=data
        })

        cy.fixture("loginUser.json").then((data)=>{
        userData=data
        })

    })


    /**
     * Use fixutres to test data using data driven technique
     * User attempts to login with valid credentials
     * logged in user info is validated
     */
    it("Valid user Login", ()=>{
        cy.visit(url.baseUrl)
        loginPage.enterUserName(userData.validUser.userName)
        loginPage.enterpassword(userData.validUser.password)
        loginPage.attemptLogin()
        homePage.getLoggedInUser().then((user)=>{
            assert.equal(user.text(), userData.validUser.userName)
        })
        homePage.logOutUser()
    })


    /**
     * Use fixutres to test data using data driven technique
     * User attempts to login with invalid credentials
     * For invalid users, error message is validated
     */ 
    it("Invalid user login", ()=>{
        cy.visit(url.baseUrl)
        userData.invalidUsers.forEach(invalidUser => {
            loginPage.enterUserName(invalidUser.userName)
            loginPage.enterSpecialCharPassword(invalidUser.password)
            loginPage.attemptLogin()
            loginPage.getErrorMessage().then((data)=>{
                assert.equal(userData.errorMessage, data.text())
            })
        })
    })


   /**
     * Use fixutres to test data using data driven technique
     * User attempts to login with sql injection credentials
     * For failed attempt, login failure message is validated
     */
    it("SQL injection user login", ()=>{
        cy.visit(url.baseUrl)
        userData.sqlInjectionUsers.forEach(sqlInjectionUser => {
            loginPage.enterUserName(sqlInjectionUser.userName)
            loginPage.enterSpecialCharPassword(sqlInjectionUser.password)
            loginPage.attemptLogin()
            loginPage.getErrorMessage().then((data)=>{
                assert.equal(userData.errorMessage, data.text())
            })
        })
    })

})