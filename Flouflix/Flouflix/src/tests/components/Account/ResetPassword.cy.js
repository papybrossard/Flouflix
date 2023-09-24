import ResetPassword from './ResetPassword.vue'

describe('<ResetPassword />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ResetPassword)
  })
})