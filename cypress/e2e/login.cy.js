const invalidUsers = require('../fixtures/invalid-users-data')
const validUsers = require('../fixtures/valid-users-data')

describe('Login', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('Login successful', () => {
        cy.login(validUsers.username, validUsers.password)
        cy.contains('Invoice List').should('be.visible')
    })

    // The last scenario will fail as expected in scenario 2 iteration 4 of the table ("Login (Negative)")
    invalidUsers.forEach((user, index) => {
        it(`${index + 1} - Unsuccessful login`, () => {
            cy.login(user.username, user.password)
            cy.get('.alert').should('be.visible').and('contains.text', 'Wrong username or password.')
        })
    })

    it('Validate invoice details', () => {
        cy.login(validUsers.username, validUsers.password)
        cy.contains('Invoice List').should('be.visible')
        cy.get('div.row > div.col > a:first-child').first().invoke('removeAttr', 'target').click()
        cy.get('h2.mt-5').should('be.visible')
      
        cy.fixture('data').then((data) => {
          cy.validateInvoiceDetails(data[0])
        })
    })
})


