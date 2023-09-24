import Disconnect from './Disconnect.vue'

describe('<Disconnect />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(Disconnect)
  })
})