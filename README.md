Pre-requisites/Already installed software:
------
Assumption is that Node.js is already installed on the device.
In case, it needs to be installed then downaloadable is availble at: https://nodejs.org/en/download

Clone the code or Download as .zip
-----
code is availbale at: https://github.com/VishwanathKundral/Powerside_testing_challenge
Change the working directory to Powerside_testing_challenge

Execute the following commands to setup the environment
------
npm install cypress --save-dev
npm i --save-dev cypress-mochawesome-reporter

Execute the automated test cases
------
Grouped important test cases in one spec file. Run the following command to execute them:
npx cypress run --spec cypress\e2e\FiveImpoTests.cy.js

Additionally, there are few more test cases automated. Feel free to execute all the test cases using following command:
npx cypress run

Mocha reporter is used to generate the HTML report
--------
You can find the test results in folder cypress\reports
screenshot of failed test cases in folder \cypress\screenshots


