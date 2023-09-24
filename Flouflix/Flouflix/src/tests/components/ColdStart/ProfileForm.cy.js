import ProfileForm from './ProfileForm.vue'

describe('<ProfileForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ProfileForm)
  })
})