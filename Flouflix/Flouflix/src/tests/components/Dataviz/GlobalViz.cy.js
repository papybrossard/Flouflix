import GlobalViz from './GlobalViz.vue'

describe('<GlobalViz />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(GlobalViz)
  })
})