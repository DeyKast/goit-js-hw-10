import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchedList = document.querySelector('.country-list');
const searchedCountry = document.querySelector('.country-info');
searchedList.style.padding = '0px';
searchedList.style.fontWeight = '700';

function fetchCountries(name) {
  fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(resp => {
      if (!resp.ok) {
        searchedCountry.innerHTML = '';
        searchedList.innerHTML = '';
        Notify.failure('Oops, there is no country with that name');
        throw new Error(resp.status);
      }

      return resp.json();
    })
    .then(data => {
      if (data.length >= 2 && data.length <= 9) {
        searchedCountry.innerHTML = '';
        searchedList.innerHTML = '';
        data.forEach(element => {
          const countryName = element.name.official;
          const countryFlag = element.flags.svg;

          const createEl = `
            <li style="list-style: none; align-items: center; justify-content: flex-start; display: flex; gap: 20px;">
            <img src="${countryFlag}" alt="flag" width="30px" >
              <p>${countryName}</p>
            </li> `;

          searchedList.insertAdjacentHTML('afterbegin', createEl);
        });
      } else if (data.length >= 10) {
        searchedCountry.innerHTML = '';
        searchedList.innerHTML = '';
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else {
        searchedCountry.innerHTML = '';
        searchedList.innerHTML = '';

        let values = Object.values(data[0].languages);
        let sortedLanguages = '';
        let i = 1;

        for (const value of values) {
          sortedLanguages += `${value}`;
          if (i < values.length) {
            sortedLanguages += `, `;
          } else {
            sortedLanguages += `.`;
          }
          i++;
        }

        const foundCountryEl = `     
              <img src="${data[0].flags.svg}" alt="flag" width="250px" >
              <p style="font-weight: 700; font-size: 30px; margin-top: 16px; margin-bottom: 16px;">${data[0].name.official}</p>
              <p style="font-size: 24px; margin-top: 16px; margin-bottom: 16px;">Capital: ${data[0].capital}</p>
              <p style="font-size: 24px; margin-top: 16px; margin-bottom: 16px;">Population: ${data[0].population}</p>
              <p style="font-size: 24px; margin-top: 16px; margin-bottom: 16px;">Language: ${sortedLanguages}</p>`;

        searchedCountry.insertAdjacentHTML('afterbegin', foundCountryEl);
        Notify.success(`Country found - ${data[0].name.official}`);
      }
    })
    .catch(console.warn);
}

export { fetchCountries };
