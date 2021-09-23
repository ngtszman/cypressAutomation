/// <reference types='cypress' />

describe("First Test Suite", function()
{

  it('delete address first', function()
  {
     cy.visit("http://a.testaddressbook.com/")   //Open the URLs
     cy.on('uncaught:exception', (err, runnable) => {
      return false
    })

    
    cy.get("[data-test=sign-in]").click()   //Sign In 
    cy.wait(2000)
    

      cy.get("[data-test=email]").type('isaac@isaac.com')

     cy.get("[data-test=password]").type('12345678')
     cy.get("[data-test=submit]").click()
     
     cy.get("[data-test=addresses]").click()
     // cy.get(".table").find("[data-method=delete]").should('be.visible').click({ multiple: true },{force: true})   // finds the delete button
     cy.get(".table")
          .find("tr")
          .then((row) => {
            //cy.get("[data-method=delete]").click({ multiple: true },{force:true})
            //row.length will give you the row count
              var genArr = Array.from({length:(row.length-1)},(v,k)=>k+1)
              cy.wrap(genArr).each((index) => {
              cy.get("table > tbody > tr:nth-child(1) > td:nth-child(7) > a" ).click()
              })
              cy.log(row.length);
        });

     cy.on('uncaught:exception', (err, runnable) => {
      return false
    })
     cy.wait(5000)

     cy.get(".table").find('tr').should('have.length',1)



  })


      it('1. Sign Up', function()
      {

          cy.visit("http://a.testaddressbook.com/")   //Open the URLs
          cy.on('uncaught:exception', (err, runnable) => {
            return false
          })

          
          cy.get("[data-test=sign-in]").click()   //Sign In 
          cy.wait(2000)
          cy.get("[data-test=sign-up]").click()  //Sign Up
          cy.wait(2000)


           cy.get("[data-test=email]").type('isaac@isaac.com')

           cy.get("[data-test=password]").type('12345678')
           cy.get("[data-test=submit]").click()
          
         
    })


    it('1. Sign In and 2. add new address', function()
    {

          cy.visit("http://a.testaddressbook.com/")   //Open the URLs
          cy.on('uncaught:exception', (err, runnable) => {
            return false
          })

          
          cy.get("[data-test=sign-in]").click()   //Sign In 
          cy.wait(2000)
          

            cy.get("[data-test=email]").type('isaac@isaac.com')

           cy.get("[data-test=password]").type('12345678')
           cy.get("[data-test=submit]").click()
           
           //cy.get(".navbar-text[data-test=current-user]").should('eq', 'isaac@isaac.com')    //should('have.value','isaac@isaac.com')
          cy.get('.navbar-text').contains('isaac@isaac.com')  //verify the email address is correct 

           cy.get("[data-test=addresses]").click()
           
           var NbrOfAddress = 0 
           cy.get(".table")
            .find("tr")
            .then((row) => {
              //row.length will give you the row count
              NbrOfAddress=row.length-1
          });

           cy.get("[data-test=create]") .click()
     
           cy.get("#address_first_name").type('Isaac')
           cy.get("#address_last_name").type('Ng')
           cy.get("#address_street_address").type('Westfield Avenue')
           cy.get("#address_city").type('London')
           cy.get("#address_zip_code").type('E20 1DB')
           //Try to upload a photo, select a colour, and change State.
           cy.get('#address_color').invoke('val', '#ff0000').trigger('change')
           
           cy.get('#address_state').select('California')
           
           const filePath = 'idle_timer.png'
           cy.get('#address_picture').attachFile(filePath)
           cy.wait(2000)
           //cy.get('#address_picture').contains('idle_timer.png')
           
           
           cy.get("[data-test=submit]").click()
          // 2. verify the details of the new address
          cy.get("[data-test=first_name]").contains('Isaac')
          cy.get("[data-test=last_name]").contains('Ng')
          cy.get("[data-test=street_address]").contains('Westfield Avenue')
          cy.get("[data-test=city]").contains('London')
          cy.get("[data-test=zip_code]").contains('E20 1DB')

          // 3.	Click the edit address link. Check that correct details are shown.
          cy.get("[data-test=edit]").click()
          cy.get("#address_first_name").should('have.value', 'Isaac')
          cy.get("#address_last_name").should('have.value', 'Ng')
          cy.get("#address_street_address").should('have.value', 'Westfield Avenue')
          cy.get("#address_city").should('have.value', 'London')
          cy.get("#address_zip_code").should('have.value', 'E20 1DB')

          // 4.	Update some details and check that the correct updated details are shown on the list.
          cy.get("#address_secondary_address").type('Startford')
          cy.get("#address_age").type('33')
          cy.get("#address_phone").type('07519123456')
          cy.get(".btn-primary").click()  
          cy.get("[data-test=secondary_address]").contains('Startford')
          cy.get("[data-test=age]").contains('33')
          cy.get("[data-test=phone]").contains('0751-912-3456')

          // 5.	Try to create a new address without a First name and Zip code. Verify that the correct error messages are displayed.
          cy.get("[data-test=list]").click()
          cy.get("[data-test=create]").click()
         
          cy.get("#address_last_name").type('Suen')
          cy.get("#address_street_address").type('Westfield Avenue')
          cy.get("#address_city").type('London')
          
          cy.get("[data-test=submit]").click()

          cy.get("#error_explanation").contains('First name can\'t be blank')
          cy.get("#error_explanation").contains('Zip code can\'t be blank')

          // 6.	Correct the errors and check that the list contains the correct number of addresses.
          cy.get("#address_first_name").type('Cissy')
          cy.get("#address_zip_code").type('E20 1DB')
          cy.get("[data-test=submit]").click()
          cy.get("[data-test=list]").click()
          
         // cy.get('.table').contains('td', 'Cissy').should('be.visible')
         // cy.get('.table').contains('td', 'Isaac').should('be.visible')
          
          
          cy.get(".table").find('tr').should('have.length',((NbrOfAddress+2)+1)) // two new address added, and header row

          // 7.	Delete all the addresses and verify that the list is empty.
          cy.get(".table")
          .find("tr")
          .then((row) => {
            //cy.get("[data-method=delete]").click({ multiple: true },{force:true})
            //row.length will give you the row count
              var genArr = Array.from({length:(row.length-1)},(v,k)=>k+1)
              cy.wrap(genArr).each((index) => {
                cy.get("table > tbody > tr:nth-child(1) > td:nth-child(7) > a" ).click()
              })
              cy.log(row.length);
        });

          cy.on('uncaught:exception', (err, runnable) => {
            return false
          })
          cy.wait(5000)

          cy.get(".table").find('tr').should('have.length',1)

          /** 
          cy.get("#tableID")
            .find("tr")
            .then((row) => {
              //row.length will give you the row count
              cy.log(row.length);
          });
          //cy.get(".table > tbody > tr:nth-child(2) > td:nth-child(7) > a").click()
          //cy.get(".table > tbody > tr:nth-child(1) > td:nth-child(7) > a").click()
          cy.get(".table").find('tr').should('have.length',1)
          */          

    }) 

    it('Bonus 1. Create an assertion which will cause a fail ', function()
    {

          cy.visit("http://a.testaddressbook.com/")   //Open the URLs
          cy.on('uncaught:exception', (err, runnable) => {
            return false
          })

          
          cy.get("[data-test=sign-in]").click()   //Sign In 
          cy.wait(2000)
          

          cy.get("[data-test=email]").type('isaac@isaac.com')

           cy.get("[data-test=password]").type('12345678')
           cy.get("[data-test=submit]").click()
           
           //cy.get(".navbar-text[data-test=current-user]").should('eq', 'isaac@isaac.com')    //should('have.value','isaac@isaac.com')
          cy.get('.navbar-text').contains('isaac@isaac.com')  //verify the email address is correct 

           cy.get("[data-test=addresses]").click()
           cy.get("[data-test=create]") .click()
     
           cy.get("#address_first_name").type('Isaac')
           cy.get("#address_last_name").type('Ng')
           cy.get("#address_street_address").type('Westfield Avenue')
           cy.get("#address_city").type('London')
           cy.get("#address_zip_code").type('E20 1DB')
           //Try to upload a photo, select a colour, and change State.
           cy.get('#address_color').invoke('val', '#ff0000').trigger('change')
           
           cy.get('#address_state').select('California')
           
           const filePath = 'idle_timer.png'
           cy.get('#address_picture').attachFile(filePath)
           cy.wait(2000)
           //cy.get('#address_picture').contains('idle_timer.png')
           
           
           cy.get("[data-test=submit]").click()
          // 2. verify the details of the new address
          cy.get("[data-test=first_name]").contains('Isaac')
          cy.get("[data-test=last_name]").contains('Ng')
          cy.get("[data-test=street_address]").contains('Westfield Avenue')
          cy.get("[data-test=city]").contains('London')
          cy.get("[data-test=zip_code]").contains('E20 1DB')

          // 3.	Click the edit address link. Check that correct details are shown.
          cy.get("[data-test=edit]").click()
          cy.get("#address_first_name").should('have.value', 'Isaac')
          cy.get("#address_last_name").should('have.value', 'Ng')
          cy.get("#address_street_address").should('have.value', 'Westfield Avenue')
          cy.get("#address_city").should('have.value', 'London')
          cy.get("#address_zip_code").should('have.value', 'E20 1DB')

          // 4.	Update some details and check that the correct updated details are shown on the list.
          cy.get("#address_secondary_address").type('Startford')
          cy.get("#address_age").type('33')
          cy.get("#address_phone").type('07519123456')
          cy.get(".btn-primary").click()  
          cy.get("[data-test=secondary_address]").contains('Startford')
          cy.get("[data-test=age]").contains('33')
          cy.get("[data-test=phone]").contains('0751-912-3456')

          // 5.	Try to create a new address without a First name and Zip code. Verify that the correct error messages are displayed.
          cy.get("[data-test=list]").click()
          cy.get("[data-test=create]").click()
         
          cy.get("#address_last_name").type('Suen')
          cy.get("#address_street_address").type('Westfield Avenue')
          cy.get("#address_city").type('London')
          
          cy.get("[data-test=submit]").click()

          cy.get("#error_explanation").contains('First name can\'t be blank')
          cy.get("#error_explanation").contains('Zip code can\'t be blank')

          // 6.	Correct the errors and check that the list contains the correct number of addresses.
          cy.get("#address_first_name").type('Cissy')
          cy.get("#address_zip_code").type('E20 1DB')
          cy.get("[data-test=submit]").click()
          cy.get("[data-test=list]").click()
         
           // assertion confirm there are three addresses in the list when in fact there are two
           // and capture a screen-grab on fail.
           // run command , to have the little reporting capability 
           // .\node_modules\.bin\cypress run --spec "cypress\integration\2-advanced-examples\TestAddressBook.js"

          cy.get(".table").find('tr').should('have.length',4)

          // logout 
          cy.get("[data-test=sign-out]").click()
          

    })


    it('delete address', function()
    {
       cy.visit("http://a.testaddressbook.com/")   //Open the URLs
       cy.on('uncaught:exception', (err, runnable) => {
        return false
      })
  
      
      cy.get("[data-test=sign-in]").click()   //Sign In 
      cy.wait(2000)
      
  
        cy.get("[data-test=email]").type('isaac@isaac.com')
  
       cy.get("[data-test=password]").type('12345678')
       cy.get("[data-test=submit]").click()
       
       cy.get("[data-test=addresses]").click()
       // cy.get(".table").find("[data-method=delete]").should('be.visible').click({ multiple: true },{force: true})   // finds the delete button
       cy.get(".table")
            .find("tr")
            .then((row) => {
              //cy.get("[data-method=delete]").click({ multiple: true },{force:true})
              //row.length will give you the row count
                var genArr = Array.from({length:(row.length-1)},(v,k)=>k+1)
                cy.wrap(genArr).each((index) => {
                cy.get("table > tbody > tr:nth-child(1) > td:nth-child(7) > a" ).click()
                })
                cy.log(row.length);
          });
  
       cy.on('uncaught:exception', (err, runnable) => {
        return false
      })
       cy.wait(5000)
  
       cy.get(".table").find('tr').should('have.length',1)
  
  
    })
  

})