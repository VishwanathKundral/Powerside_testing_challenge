import HomePage from "../PageObjects/HomePage.js"
import Login from "../PageObjects/LoginPage.js"
import CategoriesPage from "../PageObjects/CategoriesPage.js"

describe("Additional tests for exploration", ()=>
{
    /**
     * Varibles for test cases
     * url - baseUrl to launch the website
     * userData - login userdetails for the website
     */
    let url, userData
    const loginPage = new Login()
    const homePage = new HomePage()
    const categoriesPage = new CategoriesPage()

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
        userData=data.validUser
        })

    })

    /**
     * Have seprate mehtod for all the login activity
     * Assert if login fails to avoid actual test execution, save time
     */
    beforeEach(()=>{
        cy.visit(url.baseUrl)
            loginPage.enterUserName(userData.userName)
            loginPage.enterpassword(userData.password)
            loginPage.attemptLogin()
            homePage.getLoggedInUser().then((user)=>{
                assert.equal(user.text(), userData.userName)
            }) 
    })

    /**
     * Test the number of books listed for a category 
     * is same as available books in that category
     * Data is fectved from visible text and validated 
     * with books count in category
     */
    it("Count the Cateroy books", ()=>{
        let count=0
        categoriesPage.navigateToCategories()
        categoriesPage.getCountOfBooks().then((data)=>{
            count = data.text()
        })
        categoriesPage.enterTheCategories()
        homePage.getAllBooksTitleAndAuthor().should((data)=>{
            expect(data).to.have.length(count)
        })
    })


})