import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000', // порт dev-сервера
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}'
  }
});

