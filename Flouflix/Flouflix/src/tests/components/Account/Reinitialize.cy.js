import Reinitialize from './Reinitialize.vue'

describe('<Reinitialize />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(Reinitialize)
  })
})