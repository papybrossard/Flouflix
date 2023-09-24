import RecommendationRate from '@/components/RecommendationRate.vue'

describe('<RecommendationRate />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(RecommendationRate)
  })
})