const state = {
    message: null,
    captureInput: null
}

const getters = {
    showModal (state) {
        return state.message !== null
    }
}

const mutations = {
    showModal (state, payload) {
        state.message = payload.message
    },
    hideModal (state) {
        state.message = null
        state.captureInput = null
    },
    setInput (state, input) {
        state.captureInput = input
    }
}

export default {state, getters, mutations}

