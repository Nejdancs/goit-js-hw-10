const API_URL = 'https://restcountries.com/v3.1/name/';
const searchParams = new URLSearchParams({
  fields: 'name,capital,population,flags,languages',
});

export async function fetchCountries(name) {
  const response = await fetch(`${API_URL}${name}?${searchParams}`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  const data = await response.json();

  return data;
}
