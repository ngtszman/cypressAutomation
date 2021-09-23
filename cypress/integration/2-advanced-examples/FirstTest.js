describe("My First Test", function()
{
    it('Verify Title of The Page', function()
    {
          cy.visit('https://demo.nopcommerce.com/')
          cy.title().should('eq','nopCommerce demo store')

    })

    it('Verify Title of The Page', function()
    {
          cy.visit('https://demo.nopcommerce.com/')
          cy.title().should('eq','nopCommerce store')

    })
})