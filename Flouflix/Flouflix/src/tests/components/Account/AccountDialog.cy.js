import AccountDialog from './AccountDialog.vue'

describe('<AccountDialog />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(AccountDialog)
  })
})