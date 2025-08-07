const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

// export async function getCurrentWeather(city, lang) {
//   let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=${lang}&appid=${apiKey}`;
//   const link = await fetch(url);
//   const data = await link.json();
//   if (data.cod !== 200) throw new Error(data.message);
//   return data;
// }

// export async function getForecast(city, lang, period = 5) {
//   let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=${lang}&cnt=${period * 8}&appid=${apiKey}`;
//   const link = await fetch(url);
//   const data = await link.json();
//   if (data.cod !== "200") throw new Error(data.message);
//   return data;
// }

// export async function reverseGeocode(lat, lon) {
//   let url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
//   const link = await fetch(url);
//   const data = await link.json();
//   if (data && data.length > 0) return data[0].name;
//   throw new Error("No city found");
// }

export async function getCurrentWeather(city, lang) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=${lang}&appid=${apiKey}`;
  const link = await fetch(url);
  const data = await link.json();
  // console.log(data);
  if (data.cod !== 200) throw new Error(data.message);
  return data;
}

export async function getForecast(city, lang, period = 5) {
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&cnt=${period * 8}&units=metric&lang=${lang}&appid=${apiKey}`;
  const link = await fetch(url);
  const data = await link.json();
  if (data.cod !== "200") throw new Error(data.message);
  return data;
}

export async function reverseGeocode(lat, lon) {
  let url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
  const link = await fetch(url);
  const data = await link.json();
  // console.log(data);
  if (data && data.length > 0) return data[0].name;
  throw new Error("No city found");
}

export async function airPollution(lat, lon) {
  let url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const link = await fetch(url);
  const data = await link.json();
  // console.log(data);
  if (data && data?.list?.length > 0) return data;
  throw new Error("No air data found");
}

