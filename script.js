//alert('rendering renderFilmsList'); 
  
//fetch single film
function fetchSingleFilm(id){
    let url = 'http://localhost:3000/films/'+id;
    fetch(url).then((response) => response.json()).then((film)=>renderSingleFilm(film));
}
//display single film details
function renderSingleFilm(film){
    const divFilmContents = document.getElementById('film-content');
    divFilmContents.innerHTML = "";
    //title
    const h2 = document.createElement('h2')
    h2.innerHTML = film.title;
    divFilmContents.appendChild(h2);
    //Description
    const ParagraphForDescription = document.createElement('P');
    ParagraphForDescription.innerHTML = "<b>Description: </b>"+film.description;
    divFilmContents.appendChild(ParagraphForDescription);
    //runtime
    const h3 =document.createElement('h3')
    h3.innerHTML ="<b>Runtime: </b>" + film.runtime
    divFilmContents.appendChild(h3)
    //Showtime
    const p =document.createElement('p')
    p.innerHTML ="<b>Showtime: </b>" + film.showtime
    divFilmContents.appendChild(p)
    //available tickets
    const paragraphAvailableTickets = document.createElement('p');
    paragraphAvailableTickets.setAttribute('id','tickets');
    const availableTickets = film.capacity - film.tickets_sold;
    paragraphAvailableTickets.innerHTML = "<b>Available tickets: </b>"+availableTickets;
    divFilmContents.appendChild(paragraphAvailableTickets)
    //poster
    const img = document.createElement('img');
    //img.innerHTML = "<b>Description: </b>"+film.description;
    img.setAttribute("src",film.poster);
    img.setAttribute("height", "300");
    img.setAttribute("width", "300");
    divFilmContents.appendChild(img)
    //button
    const button = document.createElement('button');
   button.textContent = "Buy Ticket";
    divFilmContents.appendChild(button);
   button.addEventListener('click', function() {
        const ticketText = document.getElementById('tickets').innerHTML;
        //get tickets as a substring of ticketText
        const availableTickets = ticketText.substring(26);
        if(availableTickets <= 0) {
            alert("sold out");
        }
        else{
            const remainingTickets =availableTickets - 1;
        //alert(availableTickets);
        document.getElementById('tickets').innerHTML = "<b>Available tickets: </b>" + remainingTickets;
        alert("You successfully bought a ticket")
        }
    })
}
     //fetchin the  film list
function fetchFilmsList() {
    fetch('http://localhost:3000/films/').then((response) => response.json()).then((films)=>renderFilmsList(films));
}
    //display of the film details  
    function renderFilmsList(films) {
        films.forEach(film => {
            const filmList =document.getElementById('sidebar')
            const a = document.createElement('a');
            a.innerHTML=film.title;
            if(film.id == 1){
                a.className = "active";
            }
            a.onclick = function() {
               fetchSingleFilm(film.id);
            };
            filmList.appendChild(a);
        });
      }
    document.addEventListener('DOMContentLoaded', (event) => {
        fetchSingleFilm(1);
        fetchFilmsList();
      });









