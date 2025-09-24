/* eslint-disable @typescript-eslint/no-explicit-any */
type LocalArrayStorage<T> = {
  push: (key: string, value: T) => void;
  delete: (key: string, value: T) => void;
  getAll: (key: string) => T[];
  exists: (key: string, value: T) => boolean;
};

export const LocalArrayStorage = <T = any>(): LocalArrayStorage<T> => {
  // Helper: Get or initialize array
  const getArray = (key: string): T[] => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  };

  // Helper: Save array
  const saveArray = (key: string, arr: T[]) => {
    localStorage.setItem(key, JSON.stringify(arr));
  };

  return {
    push: (key, value) => {
      const arr = getArray(key);
      const exists = arr.some(
        (item) => JSON.stringify(item) === JSON.stringify(value)
      );

      if (exists) {
        const newArr = arr.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(value)
        );
        saveArray(key, newArr);
      } else {
        arr.push(value);
        saveArray(key, arr);
      }
    },

    delete: (key, value) => {
      const arr = getArray(key);
      const newArr = arr.filter(
        (item) => JSON.stringify(item) !== JSON.stringify(value)
      );
      saveArray(key, newArr);
    },

    getAll: (key) => {
      return getArray(key);
    },
    exists: (key, value) => {
      const arr = getArray(key);
      return arr.some((item) => JSON.stringify(item) === JSON.stringify(value));
    },
  };
};
