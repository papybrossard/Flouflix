import TopList from './TopList.vue'

describe('<TopList />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(TopList)
  })
})