const { faker } = require('@faker-js/faker');

describe('Demoblaze E2E Tests', () => {
  
    beforeEach(() => {
      cy.visit('https://www.demoblaze.com/');
    });
  
    it('should register a new user', () => {
      const username = faker.internet.userName();
      const password = faker.internet.password();

      cy.get('#signin2').click();
      cy.get('#sign-username').type(username);
      cy.get('#sign-password').type(password);
      cy.get('.modal-footer').contains('Sign up').click();

      cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Sign up successful.');
      });
    });
  
    it('should log in the registered user', () => {
      cy.get('#login2').click();
      cy.get('#loginusername').type('Epelpheld');
      cy.wait(2000);
      cy.get('#loginpassword').type('Epelpheld0987');
      cy.get('.modal-footer').contains('Log in').click();
      cy.get('#nameofuser').should('contain', 'Welcome Epelpheld');
    });
  
    it('should add Samsung Galaxy s6 to the cart', () => {
      cy.contains('Samsung galaxy s6').click();
      cy.get('.name').should('contain', 'Samsung galaxy s6');
      cy.contains('Add to cart').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Product added');
      });
    });
});
  