class LocalStorage {

    constructor () {
        this.store = localStorage
    }

    generateGUID () {
        // another shameless lift from stack overflow: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript#answer-2117523
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0
            let v = c === 'x' ? r : (r & 0x3 | 0x8)
            return v.toString(16)
        })
    }

    getItem (category) {
        let data = this.store.getItem(category)
        return JSON.parse(data)
    }

    setItem (category, data) {
        this.store.setItem(category, JSON.stringify(data))
    }

    deleteItem (category) {
        this.setItem(category, null)
    }

    getAllCategories () {
        // apparently localstorage is not an array so we can't do things like map
        let keys = []
        for (let i = 0, totalKeys = this.localStore.length; i < totalKeys; ++i) {
            keys.push(this.localStore.getItem(this.localStore.key(i)))
        }
        return keys
    }
}

export default LocalStorage
