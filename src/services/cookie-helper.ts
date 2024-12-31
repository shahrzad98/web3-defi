export class CookieHelper {
  public insert(key: string, value: string) {
    document.cookie = `${key}=${value};`;
  }

  public read(wantedKey: string) {
    const cookies = document.cookie.split(";").reduce((obj, item) => {
      const [key, value] = item.split("=");

      obj[key.trim()] = value;

      return obj;
    }, {});

    return cookies[wantedKey];
  }
}
