const LocalStorage = {
  get(key) {
    return localStorage.getItem(key) || '';
  },

  set(key, data) {
    localStorage.setItem(key, data);
  },

  append(key, data) {
    localStorage[key] += data
  }
}

export default LocalStorage;
