export default class Service {

  getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`no fetch ${url} + recived ${res.status}`);
    }
    return await res.json();
  };

  getWeather = async () => {
    const res = await this.getResource(
      `https://api.openweathermap.org/data/2.5/find?q=Moscow&appid=aac3af81efa850361f41111a847838fc&lang={ru}`
    );
    return res.message;
  };
}

export const service = new Service();
