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
        debugger
        let state = savedStates[label]
        // if ()
        return state
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
