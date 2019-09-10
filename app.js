// GET YOUR DATA FIRST, get functionality in place.. then hook it up to eventlisteners and DOM  

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities =[]; 

//fetch itself returns a promise 
const promise = fetch(endpoint) 
    .then(blob => blob.json())
    .then(data => cities.push(...data)); 
    //.then(data => cities.push(data)); 
    /* without spread operator it becomes a nested array with a length of 1 
    (1000 objects) needs spread operator to have length of 1000, with each object taking
    an index 
    
    */
console.log(promise); 

function findMatches(wordToMatch, cities) {
    return cities.filter(place=> {
    // here we need to find out if city or state includes what was searched 
    const regex = new RegExp(wordToMatch, 'gi'); 
    // g is going to be global and i is going to perform case-insensitive matching 
    //(match lowercase as well as uppercase)
    return place.city.match(regex) || place.state.match(regex);
    });
}
// try running findMatches('Bos', cities); in console. 
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  /* got above from finished.. need to look this up to understand.. tutorial got it from
   stack overflow */

function displayMatches() {
    const matchArray = findMatches(this.value, cities); 
    //console.log(matchArray); 
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex,`<span class ="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex,`<span class ="hl">${this.value}</span>`);
        return `
        <li>
            <span class ="name">${cityName}, ${stateName}</span>
            <span class ="population">${numberWithCommas(place.population)}</span>
        </li>
        `;
    }).join('');
    suggestions.innerHTML = html; 
    //map is going to return an array, we want 1 string so .join converts array to 1 big string 
}
const searchInput = document.querySelector('.search'); 
const suggestions = document.querySelector('.suggestions'); 

searchInput.addEventListener('change', displayMatches); 
searchInput.addEventListener('keyup', displayMatches); 