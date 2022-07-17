// eslint-disable-next-line
describe('App', () => {
  // eslint-disable-next-line
  it('Opens App and renders navigation', () => {
    // eslint-disable-next-line
    cy.visit('http://localhost:3000');
    // eslint-disable-next-line
    const navigation = cy.get('.navigation');
    navigation.should('contains.text', 'React project');
    navigation.should('contains.text', 'Final Full-Stack Project');
    navigation.should('contains.text', 'Naujas vartotojas');
    navigation.should('contains.text', 'Koreguoti vartotojus');
  });
  // eslint-disable-next-line
  it('Opens App and renders header table components', () => {
    // eslint-disable-next-line
    cy.visit('http://localhost:3000');
    // eslint-disable-next-line
    const navigation = cy.get('.header');
    navigation.should('contains.text', 'Nr.');
    navigation.should('contains.text', 'Vardas');
    navigation.should('contains.text', 'Pavardė');
    navigation.should('contains.text', 'Amžius');
  });
  // eslint-disable-next-line
  it('Opens App and renders footer', () => {
    // eslint-disable-next-line
    cy.visit('http://localhost:3000');
    // eslint-disable-next-line
    const navigation = cy.get('.footer');
    navigation.should('contains.text', '2022');
    navigation.should('contains.text', 'Egidijus Kivilis');
  });
});
