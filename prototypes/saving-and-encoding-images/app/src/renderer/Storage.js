// we want to use this class to interact with data in local storage in the
// following ways:
// - get data from local storage by a specific key name
// - update data in local storage for a specific key
// - set data in local storage by a specific key name
// - delete data in local storage with a specific key
// - have a default key for a specific instance but be able to specify another key
//     - if needed
// x list all available keys?

class LocalStorage {

  constructor (defaultStorageKeyPrefix = 'cs-matching-game:') {
    this._storageKeyPrefix = defaultStorageKeyPrefix
    this.localStore = localStorage
  }

  get storageKeyPrefix () {
    return this._storageKeyPrefix
  }

  set storageKeyPrefix (prefix) {
    this._storageKeyPrefix = prefix
  }

  getItem (key) {
    const stringifiedData = this.localStore.getItem(this.buildFullKey(key))
    return JSON.parse(stringifiedData)
  }

  setItem (key, data) {
    const stringifiedData = JSON.stringify(data)
    this.localStore.setItem(this.buildFullKey(key), stringifiedData)
  }

  updateItem (key, data) {
    // let storedData = this.getItem(this.buildFullKey(key))
  }

  buildFullKey (key) {
    return `${this.storageKeyPrefix}:${key}`
  }

  getAllStorageKeys () {
    // apparently localstorage is not an array so we can't do things like map
    let keys = []
    for (let i = 0, totalKeys = this.localStore.length; i < totalKeys; ++i) {
      keys.push(this.localStore.getItem(this.localStore.key(i)))
    }
    return keys
  }
}

export default LocalStorage
