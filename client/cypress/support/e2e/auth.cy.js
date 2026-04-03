describe('Authentication E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should register a new user', () => {
    const timestamp = Date.now();
    cy.visit('/register');
    cy.get('input[name="name"]').type(`Test User ${timestamp}`);
    cy.get('input[name="email"]').type(`test${timestamp}@example.com`);
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/');
    cy.contains('Registration successful').should('be.visible');
  });

  it('Should login with existing user', () => {
    cy.login('test@example.com', 'password123');
    cy.contains('ShopHub').should('be.visible');
  });

  it('Should logout successfully', () => {
    cy.login('test@example.com', 'password123');
    cy.get('button').contains('Logout').click();
    cy.contains('Login').should('be.visible');
    cy.url().should('include', '/login');
  });

  it('Should show error with invalid credentials', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid email or password').should('be.visible');
  });
});