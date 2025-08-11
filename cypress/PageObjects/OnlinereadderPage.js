class OnlineReader
{

    /**
     * It have variables for locator related to book reading
     * respective methods to act on it
     */
    chapterReader="#next"
    percentageValidation="#progress"
    slider="#slider"
    traverseMarkChapter="#toc-np-12 > a"
    bookMarkIcon="#bookmark"
    showBookMarks="#show-Bookmarks"
    bookMarksList="ul#bookmarks"
    
    readPages(pageCount)
    {
       while(pageCount>0){
        cy.get(this.chapterReader).click()
        cy.wait(500)
        pageCount--
       }
    }

    validateReader(validationString){
        cy.wait(1000)
        cy.get("iframe[scrolling='no']").should('be.visible').its('0.contentDocument.body')
        .then((data)=>{
            expect(data.text().toUpperCase()).to.have.string(validationString)
        })
        //return cy.get(this.percentageValidation)
    }

    tarverseToChapter(){
        cy.wait(1000)
        cy.get(this.slider).click({force: true})
        cy.get(this.traverseMarkChapter).click({force: true})
        cy.get(this.bookMarkIcon).invoke("attr", 'class').then((bookMarked)=>{
            if(bookMarked === "icon-bookmark-empty")
                cy.get(this.bookMarkIcon).click({force: true})
        })
    }

    getBookMarks(){
        cy.get(this.showBookMarks).click({force:true})
        return cy.get(this.bookMarksList)
    }


}

export default OnlineReader;