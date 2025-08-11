class BookOperation
{
    /**
     * It have variables for locator related to book operations
     * respective methods to act on it
     */

    markAsRead="#have_read_cb"
    markAsArhive="#archived_cb"
    selectShelf= "#add"
    searchResultFirstBook=".discover > a"
    addToShelf="#add-to-shelf"
    availableShelves="#add-to-shelves"
    readBooksNav="#nav_read"
    archivedBooksNav="#nav_archived"
    existingShelfList="#remove-from-shelves"

    addBookToShelf(shelfName){        
        cy.get(this.existingShelfList).then((shelves)=>{
            if(shelves.find("a").length > 0)
                this.removeFromShelf(shelfName)
        })
        cy.get(this.addToShelf).click()
        cy.get(this.availableShelves).contains(shelfName).click()
                
    }

    removeFromShelf(shelfName){
        cy.get(this.existingShelfList).contains(shelfName).click()
    }

    markBookAsRead(){
        cy.get(this.markAsRead).check()
    }

    unmarkBookAsRead(){
        cy.get(this.markAsRead).uncheck()
    }

    markBookAsArchived(){
        cy.get(this.markAsArhive).check()
    }

    unmarkBookAsArchived(){
        cy.get(this.markAsArhive).uncheck()
    }

    goToReadBooks(bookName){
        cy.get(this.readBooksNav).click()        
    }

    goToArchivedBooks(bookName){
        cy.get(this.archivedBooksNav).click()        
    }
    
}

export default BookOperation;