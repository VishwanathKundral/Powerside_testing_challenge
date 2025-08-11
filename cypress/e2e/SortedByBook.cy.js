import HomePage from "../PageObjects/HomePage.js"
import Login from "../PageObjects/LoginPage.js"

describe("Sorting books based on author, name, publisher etc.,", ()=>{
    
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
     * Sort the books based on book name and 
     * validated with sorting technique to check 
     * if it is respected (issue found)
     */
    it("Check Sorting of books",()=>{
        cy.get("#nav_new").click()
        cy.get("#asc").click()
        cy.get(".meta > a >p").then($elements => {
        const strings = [...$elements].map(el => el.innerText)
        
        //strings.forEach(element => cy.log(element));
        //cy.log("++++++++++");
        //caseSensitiveSort(strings).forEach(element => cy.log(element));
        //cy.log("----------------------------------------");
        //[...strings].sort((a, b) => a.localeCompare(b)).forEach(element => cy.log(element));
        
        expect(strings).to.deep.equal([...strings].sort((a,b)=>b.localeCompare(a)))
        })

    })

    function sensitiveSorter(a,b)
    {
        if(a===b)
            {
            return 0 ;
            }
        
        if(a.charAt(0)===b.charAt(0))
            {
            return sensitiveSorter(a.slice(1) , b.slice(1));
            } 
        
        if (a.charAt(0).toLowerCase() === b.charAt(0).toLowerCase() )
            {
            if(/^[a-z]/.test(a.charAt(0)) && /^[A-Z]/.test(b.charAt(0))) 

                {
                return -1 ;
                }

        if(/^[a-z]/.test(b.charAt(0)) && /^[A-Z]/.test(a.charAt(0)))

        {
                return -1 ;
            }

        }

        return a.localeCompare(b);
    }

    function caseSensitiveSort(stringArray)
    {
        return stringArray.sort(sensitiveSorter);
    }

})