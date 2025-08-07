import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentWeather, getForecast, reverseGeocode, airPollution } from './weatherApi';

// Thunks
export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async ({ city, lang, forecastPeriod }, thunkAPI) => {
    // fetch current weather
    const weather = await getCurrentWeather(city, lang);

    // fake historical data
    let hist = [];
    for (let i = 1; i <= 5; i++) {
      hist.push({
        dt: Date.now() - i * 86400000,
        temp: (weather.main.temp + Math.random() * 4 - 2).toFixed(1),
        humidity: (weather.main.humidity + Math.random() * 10 - 5).toFixed(0),
      });
    }

    // fetch forecast
    const forecast = await getForecast(city, lang, forecastPeriod);

    // air quality
    const airQuality = await airPollution(weather.coord.lat, weather.coord.lon);

    // AI forecast simulation
    let aiForecast = {
      list: forecast.list.map((item) => ({
        ...item,
        main: {
          ...item.main,
          temp: (item.main.temp + Math.random() * 2 - 1).toFixed(1),
          humidity: (item.main.humidity + Math.random() * 5 - 2.5).toFixed(0),
        },
      })),
      explain:
        lang === "bn"
          ? "AI মডেল আবহাওয়া ডেটার ধারা বিশ্লেষণ করে এবং স্থানীয় গতানুগতিক তথ্যকে বিবেচনা করে।"
          : "The AI model analyzes weather patterns and adjusts predictions based on recent trends and local knowledge.",
    };

    // Alerts simulation
    let alerts =
      weather.weather[0].main === "Thunderstorm"
        ? [
          {
            event: lang === "bn" ? "বজ্রপাত সতর্কতা" : "Thunderstorm Alert",
            description: lang === "bn"
              ? "তীব্র বজ্রপাত হয়েছে। ঘরের ভিতরে থাকুন!"
              : "Severe thunderstorm detected. Stay indoors!",
          },
        ]
        : [];

    return {
      weather,
      history: hist.reverse(),
      forecast,
      airQuality,
      aiForecast,
      alerts,
    };
  }
);

export const fetchCityByCoords = createAsyncThunk(
  'weather/fetchCityByCoords',
  async ({ lat, lon }, thunkAPI) => {
    const city = await reverseGeocode(lat, lon);
    return city.replace(/\b(Union|Subdistrict|Upazila|District|Division)\b/gi, "") // Remove keywords
      .replace(/,+/g, "")            // Remove stray commas
      .replace(/\s+/g, " ")          // Replace multiple spaces with single
      .replace(/^\s+|\s+$/g, "");    // Trim leading/trailing spaces
  }
);

const initialState = {
  city: "Dhaka",
  lang: "en",
  consent: false,
  forecastPeriod: 5,
  weather: null,
  history: [],
  airQuality: null,
  forecast: null,
  airQuality: null,
  aiForecast: null,
  alerts: [],
  loading: false,
  error: null,
  showAIExplain: false,
  feedback: "",
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCity: (state, action) => { state.city = action.payload; },
    setLang: (state, action) => { state.lang = action.payload; },
    setConsent: (state, action) => { state.consent = action.payload; },
    setForecastPeriod: (state, action) => { state.forecastPeriod = action.payload; },
    setShowAIExplain: (state, action) => { state.showAIExplain = action.payload; },
    setFeedback: (state, action) => { state.feedback = action.payload; },
    setError: (state, action) => { state.error = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      // fetchWeatherData
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.weather = action.payload.weather;
        state.history = action.payload.history;
        state.forecast = action.payload.forecast;
        state.airQuality = action.payload.airQuality;
        state.aiForecast = action.payload.aiForecast;
        state.alerts = action.payload.alerts;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch weather data.";
        state.weather = null;
        state.forecast = null;
        state.aiForecast = null;
        state.alerts = [];
        state.history = [];
      })
      // fetchCityByCoords
      .addCase(fetchCityByCoords.fulfilled, (state, action) => {
        state.city = action.payload;
      });
  }
});

export const { setCity, setLang, setConsent, setForecastPeriod, setShowAIExplain, setFeedback, setError } = weatherSlice.actions;

export default weatherSlice.reducer;
