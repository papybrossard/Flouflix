import RecommendationSpace from '@/views/RecommendationSpace.vue'

describe('<RecommendationSpace />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(RecommendationSpace)
  })
})