// The keypad component is a bolt on to the existing game logic and structure
// to make the app usable on a raspberry pi with a touch screen. The raspi w/
// touch screen is not a touch screen device, it's a linux computer with a touch
// screen. That is, on a touch screen device you would tap on an input an expect
// to see a keyboard pop up. The raspi w/ touch screen is just a regular computer
// so when you tap on an input nothing happens b/c the raspi expects that you
// already have a keyboard. I'm sure there is a way that I could hook into the
// raspbian on screen keyboard, but really, there are _two_ inputs in this whole
// app, after a later refactor there will probably be one, and the pi was not
// one of the platforms that I original planned on building for. All of this is
// to say, this keypad component and its state are intended to be a bolt on
// to the original app. The goal is to be as non-invasive as possible with it.
// we should be able to pull the keypad files out and the minimum references to it
// in the home component and have the app still run fine. I say all of this so that
// when you look over the logic here in the state you understand why I made
// some of the decissions I did and why the keypad just works with the home state
// rather than having it's own state but should still be separate from the home
// state itself.

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
    updateSelectedInput ({dispatch, getters}, newValue) {
        return new Promise((resolve, reject) => {
            // I hear what you're saying "why dispatch this action to another action in the home module?
            // we can just commit to the home mutations from here" and yeah, you're right, we can, but
            // by passing the inputName back to the home state without evaluation in the keypad state we
            // move all of the logic for what the input names are, what's a valid input name, etc back into
            // the home state. In this keyboard state we can just pass around a reference to the home state
            // as is and the home state can worry about those values.
            const payload = {inputName: getters.selectedInputName, newValue}
            dispatch('home/setBoardSizeInputByInputName', payload, {root: true})
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
