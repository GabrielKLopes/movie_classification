import { movies } from './movies.js';

document.getElementById('filmForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Evita o envio do formulário

  // Obtém a idade e categorias selecionadas
  let age = parseInt(document.getElementById('age').value); // Converte a idade para número
  let categories = document.querySelectorAll('input[name="category"]:checked');

  let selectedCategories = [];
  for (let i = 0; i < categories.length; i++) {
    selectedCategories.push(categories[i].value);
  }

  // Filtra os filmes com base na idade e categorias
  let filteredMovies;
  if (age >= 1 && age <= 9) {
    // Filtra filmes adequados para idade de 0 a 9
    filteredMovies = movies.filter(
      (movie) =>
        movie.ageRating <= 9 && selectedCategories.includes(movie.genre)
    );
  } else {
    // Filtra filmes com base na categoria e idade
    filteredMovies = movies.filter(
      (movie) =>
        selectedCategories.includes(movie.genre) && movie.ageRating <= age
    );
  }

  // Limpa os resultados anteriores
  let movieResults = document.getElementById('movieResults');
  movieResults.innerHTML = '';

  // Exibe os filmes
  for (let i = 0; i < filteredMovies.length; i++) {
    let movie = filteredMovies[i];
    let movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');

    movieDiv.innerHTML = `
      <h3>${movie.title}</h3>
      <p><strong>Gênero:</strong> ${movie.genre}</p>
      <p><strong>Sinopse:</strong> ${movie.synopsis}</p>
      <iframe width="560" height="315" src="${movie.trailer}"
      frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;

    movieResults.appendChild(movieDiv);
  }

  // Se não houver filmes compatíveis
  if (filteredMovies.length === 0) {
    movieResults.innerHTML = '<p>Nenhum filme encontrado para as categorias selecionadas.</p>';
  }
});
