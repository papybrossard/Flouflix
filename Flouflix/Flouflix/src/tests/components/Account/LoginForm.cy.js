import LoginForm from './LoginForm.vue'

describe('<LoginForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(LoginForm)
  })
})