export default class Service {

  getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`no fetch ${url} + recived ${res.status}`);
    }
    return await res.json();
  };

  getWeatherByName = async (cityName) => {
    const res = await this.getResource(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=695edea94fb6f18ec372f919a85d07b5&lang=ru`
    );
    return res;
  };

  getWeatherByCoord = async (lat, lon) => {
    const res = await this.getResource(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=695edea94fb6f18ec372f919a85d07b5&lang=ru`
    );
    return res;
  };

};

export const service = new Service();
