import ModalPassword from './ModalPassword.vue'

describe('<ModalPassword />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ModalPassword)
  })
})