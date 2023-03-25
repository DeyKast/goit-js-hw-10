import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import _ from 'lodash';

const DEBOUNCE_DELAY = 300;
const debounced = _.debounce(value => {
  fetchCountries(value);
}, DEBOUNCE_DELAY);

const countryInput = document.querySelector('#search-box');

countryInput.addEventListener('input', event => {
  if (event.target.value != 0) {
    debounced(event.target.value.trim());
  } else {
    return;
  }
});
