// we want to use this class to interact with data in local storage in the
// following ways:
// - get data from local storage by a specific key name
// - update data in local storage for a specific key
// - set data in local storage by a specific key name
// - delete data in local storage with a specific key
// - have a default key for a specific instance but be able to specify another key
//     - if needed
// x list all available keys?

// you're over thinking this
// we dont' need a unique key for local storage b/c it's not going to be intermingled with
// data from other sites in storage. we just need a key to identify the category being saved
// and then the data to be stored.
// it doesn't make sense to use guids for anything b/c we'll just end up with an object at has
// guid keys with groupings of arrays of data. in this prototype, we just need a storage category
// of:
// images
// and a value that is an array of the images.
// I can see the value in using a guid to key the image so that when we need to delete one we can
// call it by an identifier instead of doing a value for value comparison on a base64 encoded string,
// but if we go that direction we need to make sure the guid corresponds to one image, e.g.

// images
// ------
// [
//   {id: asfsafasfadsf, image: basesixtyfourstring....},
//   {id: qweqwewqewqee, image: hfhsadkfhaskljhfsuu....},
// ]

// i feel like this becomes pretty specific as to how the data is stored, stream line this class to focus
// on getting and setting items only, leave updating logic in the caller, and
// create a static method for creating guids so that the caller can do the maniulating

// now that this is simplified, do we really need an object? there's not really anything
// that needs to be constructed and shared. Maybe it's better to turn it into a regular
// js module.
// If nothing else leave this as a class in the prototype (good to get the practice in) and
// build it as a module in the actual matching game
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

/*

class LocalStorage {

  constructor (defaultStorageKeyPrefix = 'cs-matching-game') {
    this._storageKeyPrefix = defaultStorageKeyPrefix
    this.localStore = localStorage
  }

  get storageKeyPrefix () {
    return this._storageKeyPrefix
  }

  set storageKeyPrefix (prefix) {
    this._storageKeyPrefix = prefix
  }

  getCategory (storageCategory) {
    const stringifiedData = this.localStore.getItem(this.buildFullCategoryKey(storageCategory))
    return JSON.parse(stringifiedData)
  }

  getItemFromCategory (storageCategory, guid) {
    debugger
    const dataObject = this.getCategory(storageCategory)
    if (dataObject.hasOwnProperty(guid)) {
      return dataObject[guid]
    }

    return null
  }

  setItem (storageCategoryKey, data) {
    debugger
    const newDataObject = {guid: this.createGUID(), data}
    const stringifiedData = JSON.stringify(newDataObject)

    this.localStore.setItem(this.buildFullCategoryKey(storageCategoryKey), stringifiedData)

    return newDataObject.guid
  }

  updateItem (storageCategoryKey, data) {
    debugger
    let dataObject = this.getCategory(storageCategoryKey) || {}
    dataObject[this.createGUID()] = data

    const stringifiedData = JSON.stringify(dataObject)

    this.localStore.setItem(this.buildFullCategoryKey(storageCategoryKey), stringifiedData)
  }

  buildFullCategoryKey (categoryKey) {
    return `${this.storageKeyPrefix}:${categoryKey}`
  }

  getAllStorageKeys () {
    // apparently localstorage is not an array so we can't do things like map
    let keys = []
    for (let i = 0, totalKeys = this.localStore.length; i < totalKeys; ++i) {
      keys.push(this.localStore.getItem(this.localStore.key(i)))
    }
    return keys
  }

  // another shameless lift from stack overflow: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript#answer-2117523
  createGUID () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16 | 0
      let v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
}
*/
export default LocalStorage
