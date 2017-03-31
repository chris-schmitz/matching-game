// Right now this class is labeled generically but it's structure only really
// supports saving game states. It doesn't really matter for this project (I don't
// see this app storing anything other than game state), but if you use this class
// as a reference in future projects consider either making the name more specific
// or making the structure more generic.
class BrowserStorage {
    constructor (key = 'saved-states') {
        this._savedStateKey = key
        this.store = window.localStorage
    }

    storeaSavedState (savedStatePayload = {label: '', state: ''}) {
        let savedStates = this.getSavedStates()
        savedStates[savedStatePayload.label] = savedStatePayload.state
        this.setSavedStates(savedStates)
    }

    getaSavedState (label) {
        if (typeof label === 'undefined' || label === 'null') {
            throw new Error('No saved state label provided.')
        }

        let savedStates = this.getSavedStates()
        let state = savedStates[label]
        return JSON.parse(state)
    }

    deleteASavedState (label) {
        let states = this.getSavedStates()
        delete states[label]
        this.setSavedStates(states)
    }

    getSavedStates () {
        let savedStates = this.store.getItem(this.savedStateKey)
        if (savedStates === null) {
            return {}
        }
        return JSON.parse(savedStates)
    }

    setSavedStates (savedStatsObject) {
        let stringed = JSON.stringify(savedStatsObject)
        this.store.setItem(this.savedStateKey, stringed)
    }

    get savedStateKey () {
        return this._savedStateKey
    }

    set savedStateKey (prefix) {
        if (prefix !== undefined) {
            this._savedStateKey = prefix
        } else {
            throw new Error("You must provide a prefix (even if it's just null)")
        }
    }
}

export default new BrowserStorage()
