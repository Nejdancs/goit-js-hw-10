export function createMarkupList(countries) {
  return countries
    .map(
      ({ name: { official }, flags: { svg } }) =>
        `<li class="country-list__item">
          <img src="${svg}" alt="${official}" width=30 >
          <p class="country-list__name">${official}</p>
        </li>`
    )
    .join('');
}
