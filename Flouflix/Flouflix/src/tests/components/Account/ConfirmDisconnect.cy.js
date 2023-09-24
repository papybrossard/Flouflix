import ConfirmDisconnect from './ConfirmDisconnect.vue'

describe('<ConfirmDisconnect />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ConfirmDisconnect)
  })
})