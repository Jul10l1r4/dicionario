const dicioData = document.getElementById('dicio-data');
const input = document.getElementById('dicio-search');

const defaultTitle = '';
const url = `https://atheckos.github.io/dicionario/dicio/`;

const dicioDataTpl = (dicio) => {
  let actors = dicio.Actors.split(',');
  
  return `
    <div class="dicio__poster">
      <span class="dicio__poster--fill">
        <img src="${dicio.Poster}" />
      </span>
      <span class="dicio__poster--featured">
        <img src="${dicio.Poster}" />
      </span>
    </div>
    <div class="dicio__details">
      <h2 class="dicio__title">${dicio.Title}</h2>
      <ul class="dicio__tags list--inline">
        <li class="dicio__rated">${dicio.Rated}</li>
        <li class="dicio__year">${dicio.Year}</li>
        <li class="dicio__year">${dicio.Genre}</li>
      </ul>
      <p class="dicio__plot">${dicio.Plot}</p>
      <div class="dicio__credits">
        <p><strong>Written by:</strong> ${dicio.Writer}</p>
        <p><strong>Directed by:</strong> ${dicio.Director}</p>
        <p><strong>Starring:</strong></p>
        <ul class="dicio__actors list--inline">
          ${actors.map(actor => `<li>${actor}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
};

const noResultsTpl = () => {
  return `
    <div class="dicio__no-results">
      <h2>No results</div>
    </div>
  `;
};

const finddicio = (title) =>  {
  fetch(url + title, {
    method: 'get',
  }).then(function(res) {
    return res.json();
  }).then(function(data) {
    dicioData.innerHTML = dicioDataTpl(data);
  }).catch(function(err) {
    dicioData.innerHTML = noResultsTpl();
  });
}

finddicio(defaultTitle);

input.addEventListener('keypress', (e) => {
  if (e.keyCode === 13 && input.value) finddicio(input.value);
});