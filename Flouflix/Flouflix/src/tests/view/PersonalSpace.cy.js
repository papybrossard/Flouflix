import PersonalSpace from '@/views/PersonalSpace.vue'

describe('<PersonalSpace />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(PersonalSpace)
  })
})