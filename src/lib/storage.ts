// @ts-nocheck
const storage = {
  set: (key, object) => {
    if (!sessionStorage) return;
    sessionStorage[key] =
      typeof object === 'string' ? object : JSON.stringify(object);
  },
  get: (key) => {
    if (!sessionStorage) return null;
    if (!sessionStorage[key]) {
      return null;
    }

    try {
      const parsed = JSON.parse(sessionStorage[key]);
      return parsed;
    } catch (e) {
      return sessionStorage[key];
    }
  },
  remove: (key) => {
    if (!sessionStorage) return null;

    if (sessionStorage[key]) {
      sessionStorage.removeItem(key);
    }
    return null;
  },
};

export default storage;
