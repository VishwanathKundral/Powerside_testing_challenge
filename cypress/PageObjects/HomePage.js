class HomePage
{
    /**
     * It have variables for locator related to book list, user, search
     * respective methods to act on it
     */

    loggedInuser="#top_user#top_user > .hidden-sm"
    logOut="#logout"
    searchLibrary="input[placeholder='Search Library']"
    searchQuery="#query_submit"
    booksMeta=".meta"
    searchReultString=".discover"
    searchResultFirstBook=this.booksMeta.concat(" > a")
    readBookbutton="#readbtn"

    logOutUser(){
        cy.get(this.logOut).click()
    }

    getLoggedInUser(){
        return cy.get(this.loggedInuser)
    }

    enterSearchKeyword(search){
        cy.get(this.searchLibrary).clear().type(search)
    }

    startSearch(){
        cy.get(this.searchQuery).click()
    }

    getAllBooksTitleAndAuthor(){
        return cy.get(this.booksMeta)
    }

    getSearchReultString(){
        return cy.get(this.searchReultString)
    }

    openSerachedFirstBook(){
        this.openBookDeatils()        
        cy.get(this.readBookbutton).invoke("removeAttr", "target").click()
    }

    
    openBookDeatils(){
        cy.on('uncaught:exception', (err, runnable) => {
            //if (err.message.includes('unrecognized expression')) {
            return false
            //}
        })
        
        cy.get(this.searchResultFirstBook).invoke("removeAttr", "data-target").click()
    }
}

export default HomePage;