const state = {

}

const getters = {

}

const mutations = {

}

const actions = {
    append (digit) {
        return new Promise((resolve, reject) => {
            // call to the home mutation with digit
            resolve()
        })
    },
    backspace () {
        return new Promise((resolve, reject) => {
            // get the home state for the current input
            // slice off the last character
            // passs the sliced string back in a mutation
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

export default { state, getters, actions, mutations }
