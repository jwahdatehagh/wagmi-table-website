export default class Storage {
  /**
   * Create a new storage wrapper object.
   *
   * @param  {object} storage The storage object to use
   * @return {void}
   */
  constructor (storage = {
    getItem: () => null,
    setItem: () => null,
  }) {
    this.storage = storage
  }

  /**
   * Get a storage item by its key.
   *
   * @param  {string} key
   * @param  {string} defaultValue
   * @return {any}    The value in the store
   */
  getItem (key, defaultValue = null) {
    if (! this.hasItem(key)) return defaultValue

    try {
      return JSON.parse(this.storage.getItem(key))
    } catch (e) {
      // For some reason we don't have a json item in storage.
      if (e instanceof SyntaxError && this.hasItem(key)) {
        const value = this.storage.getItem(key)
        // Let's make sure we do in the future.
        this.setItem(key, value)
        return value
      }

      delete this.storage[key]
    }
  }

  /**
   * Set a storage item by its key.
   *
   * @param {string} key
   * @param {void}
   */
  setItem (key, value) {
    this.storage.setItem(key, JSON.stringify(value))
  }

  /**
   * Remove an item from the storage object.
   *
   * @param {string} key
   */
  removeItem (key) {
    this.storage.removeItem(key)
  }

  /**
   * Check whether an item exists on the storage object.
   *
   * @param  {string}  key
   * @return {Boolean}
   */
  hasItem (key) {
    return this.storage.getItem(key) !== null
  }
}
