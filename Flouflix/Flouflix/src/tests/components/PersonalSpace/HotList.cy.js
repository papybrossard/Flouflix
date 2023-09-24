import HotList from './HotList.vue'

describe('<HotList />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(HotList)
  })
})