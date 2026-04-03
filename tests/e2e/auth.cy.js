describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should register a new user', () => {
    cy.visit('/register');
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type(`test${Date.now()}@example.com`);
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/');
    cy.contains('Login successful').should('be.visible');
  });

  it('should login existing user', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/');
    cy.contains('Login successful').should('be.visible');
  });

  it('should logout user', () => {
    cy.login('test@example.com', 'password123');
    cy.get('button').contains('Logout').click();
    cy.contains('Login').should('be.visible');
  });
});