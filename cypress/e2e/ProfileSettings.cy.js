import ProfileSettingsPage from "../PageObjects/ProfileSettingsPage"
import HomePage from "../PageObjects/HomePage"
import Login from "../PageObjects/LoginPage"

describe("Profile Settings", ()=>{

    /**
     * Varibles for test cases
     * url - baseUrl to launch the website
     * userData - login userdetails for the website
     */
    let url, settings, userData
    const loginPage = new Login()
    const homePage = new HomePage()
    const profileSettingsPage = new ProfileSettingsPage()
    

    /**
     * Load the data properties required for the test cases once before the execution
     * websites.json - can have multiple urls, for now it has baseUrl for login
     * loginUser.json - has multi user details, valid/in-valid
     * profileSettings.json - has profile setting used for automation
     */
    before( ()=>{
        cy.fixture("websites.json").then((data)=>{
        url=data
        })

        cy.fixture("profileSettings.json").then((data)=>{
        settings=data
        })

        cy.fixture("loginUser.json").then((data)=>{
        userData=data.validUser
        })

    })


    /**
     * Browse profile settings and disable navTab options
     * validate the disabled tabs and revert the changes 
     * post validation
     */
    it("Navigation Options and Locale", ()=>{
        cy.visit(url.baseUrl)
        loginPage.enterUserName(userData.userName)
        loginPage.enterpassword(userData.password)
        loginPage.attemptLogin()
        homePage.getLoggedInUser().then((user)=>{
            assert.equal(user.text(), userData.userName)
        }) 

        profileSettingsPage.customizeProfile()
        profileSettingsPage.disableShowTopRatedBooks(settings.navBarSelections)
        profileSettingsPage.saveChangesAction()
        profileSettingsPage.getNavList().then((data)=>{
            expect(data.text().toLowerCase()).to.not.have.string(settings.navBarSelections)
        })

        //revertChanges
        profileSettingsPage.customizeProfile()
        profileSettingsPage.enableShowTopRatedBooks(settings.navBarSelections)
        profileSettingsPage.saveChangesAction()
    })
})