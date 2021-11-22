export default {
  'GET_LIST' (state, payload) {
    state.list = payload
    console.log(state, 'state')
  }
}
