class CategoriesPage
{
    /**
     * It have variables for locator related to categories operations
     * respective methods to act on it
     */

    nav_cat="#nav_cat"
    scienceFictionCategory="#list_8"
    countListed="[data-id='Science fiction'] > [align='left']"

    navigateToCategories(){
        cy.get(this.nav_cat).click()
    }

    getCountOfBooks(){
        return cy.get(this.countListed)
    }

    enterTheCategories(){
        cy.get(this.scienceFictionCategory).contains("Science fiction").click()
    }
}

export default CategoriesPage;