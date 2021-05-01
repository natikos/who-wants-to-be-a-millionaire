export default class SessionStorageManager {
  static set = (key: string, value: string): void => {
    sessionStorage.setItem(key, value);
  };

  static clear = (): void => {
    sessionStorage.clear();
  };

  static get = (key: string): string | null => sessionStorage.getItem(key);
}
