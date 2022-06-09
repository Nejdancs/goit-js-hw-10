import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './refs';
import { fetchCountries } from './fetch-service';
import { createMarkupList } from './markup-list';
import { createMarkupCard } from './markup-card';

const DEBOUNCE_DELAY = 300;

refs.searhBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch({ target: { value } }) {
  const trimmedValue = value.trim();
  clearMarkup();
  toggleLoader();

  if (!trimmedValue) {
    toggleLoader();
    return;
  }

  fetchCountries(trimmedValue)
    .then(render)
    .catch(errorHandler)
    .finally(toggleLoader);
}

function errorHandler(error) {
  Notify.failure('Oops, there is no country with that name');
}

function render(countries) {
  clearMarkup();

  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length > 1) {
    refs.countryList.innerHTML = createMarkupList(countries);
    onCountryListRendered(countries);
  } else {
    refs.countryInfo.innerHTML = createMarkupCard(countries);
  }
}

function onCountryListRendered(countries) {
  const items = document.querySelectorAll('.country-list__item');
  items.forEach(item => item.addEventListener('click', onCountryItem));

  function onCountryItem(e) {
    const { currentTarget } = e;

    const filtered = countries.filter(
      country => country.name.official === currentTarget.dataset.item
    );

    render(filtered);

    items.forEach(item => item.removeEventListener('click', onCountryItem));
  }
}

function clearMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function toggleLoader() {
  refs.loader.classList.toggle('is-hidden');
}
