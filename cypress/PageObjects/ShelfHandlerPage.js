class ShelfHandler
{
    /**
     * It have variables for locator related to book shelf
     * respective methods to act on it
     */
    createShelfName="#nav_createshelf"
    shelfTitle="[name='title']"
    sumitButton="#submit"
    flashMessage="#flash_success"
    availableNavList="li"

    createShelfIfnotExists(shelfName, baseurl)
    {
        cy.get(this.availableNavList).then((data)=>{
            if(data.find("a").length > 0 && !data.text().includes(shelfName)){
                cy.get(this.createShelfName).click()
                cy.get(this.shelfTitle).clear().type(shelfName)
                cy.get(this.sumitButton).click()
                cy.get(this.flashMessage).then(data=>{
                    expect(data.text()).to.have.string("created")
                })
            }
        })        
    }

    selectShelf(shelfName){
        cy.get(this.availableNavList).contains(shelfName).click()
    }
}

export default ShelfHandler;