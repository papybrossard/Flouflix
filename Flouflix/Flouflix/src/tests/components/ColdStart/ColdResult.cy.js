import ColdResult from './ColdResult.vue'

describe('<ColdResult />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ColdResult)
  })
})