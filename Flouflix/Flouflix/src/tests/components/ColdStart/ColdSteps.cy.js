import ColdSteps from './ColdSteps.vue'

describe('<ColdSteps />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ColdSteps)
  })
})