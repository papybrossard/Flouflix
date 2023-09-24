import SelectTypeList from './SelectTypeList.vue'

describe('<SelectTypeList />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(SelectTypeList)
  })
})