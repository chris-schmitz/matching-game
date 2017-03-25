const state = {
    message: null,
    type: null,
    timeoutId: null
}

const getters = {
    showNotification (state) {
        return state.message !== null
    }
}

const mutations = {
    setData (state, payload) {
        state.message = payload.message
        state.type = payload.type
        state.timeoutId = payload.timeoutId
    },
    clearNotificationTimeout (state) {
        clearTimeout(state.timeoutId)
    }
}

const actions = {
    triggerNotification ({state, commit, dispatch}, payload, duration = 1500) {
        let timeoutId = null

        if (payload.hasOwnProperty('selfDismissing')) {
            commit('clearNotificationTimeout')

            timeoutId = setTimeout(() => {
                commit('setData', {message: null, type: null, timeoutId: null})
                if (payload.hasOwnProperty('callback')) {
                    payload.callback()
                }
            }, 3000)
        }

        commit('setData', {message: payload.message, type: payload.type, timeoutId: timeoutId})
    },

    clearNotification ({commit}) {
        return new Promise((resolve, reject) => {
            commit('clearNotificationTimeout')
            commit('setData', {message: null, type: null, timeoutId: null})
            resolve()
        })
    }
}

export default {state, getters, mutations, actions}
