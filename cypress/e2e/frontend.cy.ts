describe('Тесты конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('Добавление ингредиента', () => {
    cy.get('[data-testid=add-ingredient-61c0c5a71d1f82001bdaaa6f] button').click();

    cy.get('[data-testid=constructor]')
      .contains('Мясо бессмертных моллюсков Protostomia')
      .should('exist');
  });

  it('Добавление булки', () => {
    cy.get('[data-testid=add-ingredient-61c0c5a71d1f82001bdaaa6d] button').click();

    cy.get('[data-testid=constructor]')
      .contains('Флюоресцентная булка R2-D3')
      .should('exist')
  });

  it('Открытие модального окна ингредиента', () => {
    cy.get('[data-testid=add-ingredient-61c0c5a71d1f82001bdaaa6f]').click();

    cy.get('[data-testid=modal]')
      .contains('Мясо бессмертных моллюсков Protostomia')
      .should('exist');
  })

  it('Закрытие по клику на крестик', () => {
    cy.get('[data-testid=add-ingredient-61c0c5a71d1f82001bdaaa6f]').click();

    cy.get('[data-testid=ingredient-modal-close]').click();

    cy.get('[data-testid=modal]').should('not.exist');
  })  

  it('Создание заказа', () => {
    cy.intercept('GET', '**/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', '**/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    cy.window().then((win) => {
      win.localStorage.setItem('accessToken', 'mock-token');
    });

    cy.get('[data-testid=add-ingredient-61c0c5a71d1f82001bdaaa6d] button').click();
    cy.get('[data-testid=add-ingredient-61c0c5a71d1f82001bdaaa6f] button').click();

    cy.get('[data-testid=order-button]').click();

    cy.wait('@getUser');
    cy.wait('@createOrder');

    cy.get('[data-testid=modal]')
      .contains('12345')
      .should('exist');

    cy.get('[data-testid=ingredient-modal-close]').click();
    
    cy.get('[data-testid=modal]').should('not.exist');

    cy.get('[data-testid=constructor]')
      .contains('Выберите булки')
      .should('exist');
      
    cy.get('[data-testid=constructor]')
      .contains('Выберите начинку')
      .should('exist');

  })
});
