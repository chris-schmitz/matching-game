const getters = {
    // note that while this seems a bit redundent, just passing along the
    // value from a different module's getter, but by grabbing it here and
    // passing it along we can decouple our keypad component from the home
    // component a bit, i.e. we can still control the keypads .vue file
    // from it's state rules rather than relying on the home state's rules.
    selectedInputValue (state, getters, rootState, rootGetters) {
        return rootGetters['home/selectedInputsCurrentValue']
    },
    selectedInputName (state, getters, rootState) {
        return rootState.home.keypadTargetInput
    }
}

const actions = {
    append ({commit, dispatch, getters}, digit) {
        return new Promise((resolve, reject) => {
            let newValue = digit

            if (getters.selectedInputValue !== null) {
                newValue = `${getters.selectedInputValue}${digit}`
            }

            dispatch('updateSelectedInput', newValue)
                .then(() => {
                    resolve()
                })
                .catch(() => {
                    reject()
                })
        })
    },
    backspace ({getters, dispatch}) {
        return new Promise((resolve, reject) => {
            let currentValue = getters.selectedInputValue // assumed that the selected value is a number
            let newValue = currentValue.toString().split('').slice(0, -1).join('')

            dispatch('updateSelectedInput', newValue)
                .then(() => {
                    resolve()
                })
                .catch(() => {
                    reject()
                })
        })
    },
    updateSelectedInput ({commit, getters}, newValue) {
        return new Promise((resolve, reject) => {
            if (getters.selectedInputName === 'width') {
                commit('home/setBoardWidth', newValue, {root: true})
            } else if (getters.selectedInputName === 'height') {
                commit('home/setBoardHeight', newValue, {root: true})
            }
            resolve()
        })
    },
    close ({dispatch}) {
        return new Promise((resolve, reject) => {
            dispatch('home/closeKeypad', null, {root: true})
            resolve()
        })
    }
}

export default {getters, actions}
