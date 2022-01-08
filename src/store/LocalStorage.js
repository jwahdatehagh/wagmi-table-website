import Storage from './Storage'

class LocalStorage extends Storage {
  constructor () {
    let storage

    try {
      storage = typeof window !== 'undefined'
        ? window.localStorage
        : undefined
    } catch (e) {}

    super(storage)
  }
}

export const LOCALSTORAGE_KEYS = {
  PREVIOUSLY_CONNECTED: 'pc',
}

export const storage = new LocalStorage()

export default LocalStorage
