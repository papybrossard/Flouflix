import UserInformation from './UserInformation.vue'

describe('<UserInformation />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(UserInformation)
  })
})