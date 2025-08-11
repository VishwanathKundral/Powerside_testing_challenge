import Login from "../PageObjects/LoginPage"
import HomePage from "../PageObjects/HomePage"
import OnlineReader from "../PageObjects/OnlinereadderPage"
import ShelfHandler from "../PageObjects/ShelfHandlerPage"
import BookOperation from "../PageObjects/BookOperationPage"

describe("Selected Important Tests",()=>{
    
    /**
     * Varibles for test cases
     * url - baseUrl to launch the website
     * userData - login userdetails for the website
     */
    let url, userData, books
    const loginPage = new Login()
    const homePage = new HomePage()
    const onlineReder = new OnlineReader()
    const shelfHnalder = new ShelfHandler()
    const bookOperation = new BookOperation()
    
    /**
     * Load the data properties required for the test cases once before the execution
     * websites.json - can have multiple urls, for now it has baseUrl for login
     * loginUser.json - has multi user details, valid/in-valid
     * books.json - has book details for reading/archiving/shelfing
     */
    before( ()=>{     
        cy.fixture("websites.json").then((data)=>{
            url=data
        })

        cy.fixture("loginUser.json").then((data)=>{
            userData=data.validUser
        })
        
        cy.fixture("books.json").then((data)=>{
            books=data
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
     * common method used in more than 3 locations
     */
    const searchBook = (homePage, book) => {
        homePage.enterSearchKeyword(book)
        homePage.startSearch()
    }


    /**
     * Valiadte the search feature, search results
     * are expected to have the search string either
     * in book name or in author
     */
    it("Basic Search a book[existing/non-exisitng]", ()=>{

        books.searchBooks.forEach(book => {

            searchBook(homePage, book.searchKey)

            if(book.searchCount>0){
                homePage.getAllBooksTitleAndAuthor().each(($meta, index, $metas)=>{
                expect($meta.text().toLowerCase()).to.have.string(book.searchKey)
                })
            }

            else{
                homePage.getSearchReultString().then((data)=>{
                    expect(data.text()).to.have.string(book.matchString1)
                    expect(data.text()).to.have.string(book.searchKey)
                })
            }
        })
    })
        

    /**
     * Read a book and check if the read progress is 
     * persisted for a given user. For valiadtion, 
     * read few pages logout and login back to check
     * the read status (validated with string in book)
     */
    it("Resume reading where you left previously", ()=>{
        searchBook(homePage, books.resumeRead.read)
        homePage.openSerachedFirstBook()

        cy.wait(1000)
        onlineReder.readPages(books.resumeRead.pageCount)
        cy.visit(url.baseUrl)
        homePage.logOutUser()

        loginPage.enterUserName(userData.userName)
        loginPage.enterpassword(userData.password)
        loginPage.attemptLogin()

        searchBook(homePage, books.resumeRead.read)
        homePage.openSerachedFirstBook()

        cy.wait(1000)
        onlineReder.validateReader(books.resumeRead.validateProgress)
 
    })


    /**
     * Read a book and book mark a page and
     * validate the bookmark details, like it 
     * marked and saved in list(issue with marker name)
     */
    it("BookMark reading page", ()=>{
        searchBook(homePage, books.bookMarkingBook.book)
        homePage.openSerachedFirstBook()
        onlineReder.tarverseToChapter()
        onlineReder.getBookMarks().then((data)=>{
            expect(data.text()).to.have.string(books.bookMarkingBook.bookMarkedChapter)
        })

    })


    /**
     * Create an automation specific shelf and add
     * a book to it, validate the presence and remove
     * from shelf post validation
     */
    it("Shelf feature validation", ()=>{
        shelfHnalder.createShelfIfnotExists(books.shelfBooks.shelfName, url.baseUrl)
        
        searchBook(homePage, books.shelfBooks.bookName)
        homePage.openBookDeatils()
        bookOperation.addBookToShelf(books.shelfBooks.shelfName)

        shelfHnalder.selectShelf(books.shelfBooks.shelfName)
        homePage.getAllBooksTitleAndAuthor().then((meta)=>{
            expect(meta.text()).to.have.string(books.shelfBooks.bookName)
            })

        searchBook(homePage, books.shelfBooks.bookName)
        homePage.openBookDeatils()
        bookOperation.removeFromShelf(books.shelfBooks.shelfName)
    })


    /**
     * Mark a book as archived and check if it
     * is moved to archived section and restore it back.
     * Mark a book as read and check if it
     * is moved to read books section and restore it back
     */
    it("Archive and Mark as Read", ()=>{
        searchBook(homePage, books.readBook)
        homePage.openBookDeatils()

        bookOperation.markBookAsRead()
        bookOperation.goToReadBooks()

        homePage.getAllBooksTitleAndAuthor().then((meta)=>{
            expect(meta.text()).to.have.string(books.readBook)
        })

        searchBook(homePage, books.readBook)
        homePage.openBookDeatils()

        bookOperation.unmarkBookAsRead()


        searchBook(homePage, books.archiveBook)
        homePage.openBookDeatils()

        bookOperation.markBookAsArchived(true)
        bookOperation.goToArchivedBooks()

        homePage.getAllBooksTitleAndAuthor().then((meta)=>{
            expect(meta.text()).to.have.string(books.archiveBook)
        })

        searchBook(homePage, books.archiveBook)
        homePage.openBookDeatils()

        bookOperation.unmarkBookAsArchived()              
    })
        
})

