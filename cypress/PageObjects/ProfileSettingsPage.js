class ProfileSettingsPage
{
    /**
     * It have variables for locator related to user profile
     * respective methods to act on it
     */
    profile="#top_user"
    showTopRated="#show_128"
    saveChanges="#user_submit"
    navList="#scnd-nav"
    homePageIcon=".navbar-brand"

    customizeProfile(){
        cy.get(this.profile).click()
    }

    selectLocale(){
        cy.get(this.language).click()
    }

    enableShowTopRatedBooks(navBarSelections){
        if(navBarSelections === "Show Hot Books")
            cy.get(this.showTopRated).check()
        else
            assert(false, "This option is not convered in automation yet!!!")
    }

    disableShowTopRatedBooks(navBarSelections){
        if(navBarSelections === "Show Hot Books")
            cy.get(this.showTopRated).uncheck()
        else
            assert(false, "This option is not convered in automation yet!!!")
    }

    saveChangesAction(){
        cy.get(this.saveChanges).click()
        cy.get(this.homePageIcon).click()
    }

    getNavList(){
        return cy.get(this.navList)
    }
}

export default ProfileSettingsPage;