import GameForm from './GameForm.vue'

describe('<GameForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(GameForm)
  })
})