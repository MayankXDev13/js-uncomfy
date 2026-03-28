const foreignWeatherApi = {
  fetch_weather(city_name) {
    return {
      city_name,
      temp_fehrenheit: 72,
      wind_speed_mph: 5,
      condition: "party_cloudy",
    };
  },
};

class WeatherAdapter {
  constructor(foreignAPI) {
    this._api = foreignAPI;
  }

  getWeather(city) {
    const raw = this._api.fetch_weather(city);
    return {
      city: city_name,
      tempCelsius: Math.round((raw.temp_fehrenheit - 32) * (5 / 9)),
      wind_speed_kmh: Math.round(raw.wind_speed_mph * 1.6),
      condition: raw.condition,
    };
  }
}

const weather = new WeatherAdapter(foreignWeatherApi);
const report = weather.getWeather("Jaipur");

const localStorageSim = (() => {
  const store = new Map();
  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    removeItem(key) {
      store.delete(key);
    },
  };
})();

class AsyncStorageAdapter {
  constructor(syncStorage) {
    this._storage = syncStorage;
  }
  async getItem(key) {
    const raw = this._storage.getItem(key);
    try {
      return JSON.parse(raw);
    } catch (error) {
      return raw;
    }
  }

  async setItem(key, value) {
    this._storage.setItem(key, JSON.stringify(value));
  }

  async removeItem(key) {
    this._storage.removeItem(key);
  }

  async clear() {
    this._storage.clear();
  }

  get length() {
    return this._storage.length;
  }
}

async function runAsyncStorageDemo() {
  const storage = new AsyncStorageAdapter(localStorageSim);
  await storage.setItem("user", { name: "Mayank", age: 22 });
  const user = await storage.getItem("user");
  console.log(user);
}

runAsyncStorageDemo();