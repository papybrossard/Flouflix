import RecommendationCarousel from './RecommendationCarousel.vue'

describe('<RecommendationCarousel />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(RecommendationCarousel)
  })
})