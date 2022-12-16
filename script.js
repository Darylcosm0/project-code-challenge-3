let URL = 'https://project-code-challenge-3.vercel.app/db.json' 
 const listHolder = document.getElementById('films') 
 document.addEventListener('DOMContentLoaded', ()=>{ 
     document.getElementsByClassName('film item')[0].remove() 
     fetchOne(URL); 
     fetchMovies(URL) 
 }) 
  
 /**fetch 1 movie */ 
 function fetchOne(URL){ 
     fetch(URL).then((response) => response.json()) 
     .then(data => { 
         setUpMovieDetails(data.films[0]); 
     }) 
 } 
  
  
 //Create fetch function to get the data from the db.json 
 function fetchMovies(URL){ 
     fetch(URL) 
     .then(resp => resp.json()) 
     .then(movies => { 
         movies.films.forEach(movie => { 
             displayMovie(movie) 
         }); 
     }) 
 } 
 //function to display the titles of the movies as a list 
 function displayMovie(movie){ 
     const list = document.createElement('li') 
     list.style.cursor="cell" 
     list.textContent= (movie.title) 
     listHolder.appendChild(list) 
     addClickEvent() 
 } 
 //Adding the click event listener 
 function addClickEvent(){ 
     let children=listHolder.children 
     for(let i=0; i<children.length; i++){ 
         let child=children[i] 
         // console.log(child) <= to check if have the right child 
         child.addEventListener('click',() => { 
             fetch(`${URL}`) 
             .then(res => res.json()) 
             .then(movie => { 
                 document.getElementById('buy-ticket').textContent = 'Buy Ticket' 
                 setUpMovieDetails(movie.films[i]) 
             }) 
         }) 
     } 
 } 
 //Posting movie details 
 // poster to be dispalyed on the div with poster id 
 function setUpMovieDetails(funMovie){ 
     const preview = document.getElementById('poster') 
     preview.src = funMovie.poster; 
 //title 
     const movieTitle = document.querySelector('#title'); 
     movieTitle.textContent = funMovie.title; 
     //runtime 
     const movieTime = document.querySelector('#runtime'); 
     movieTime.textContent = `${funMovie.runtime} minutes`; 
     //description 
     const movieDescription = document.querySelector('#film-info'); 
     movieDescription.textContent = funMovie.description; 
     //Showtime 
     const showTime = document.querySelector('#showtime') 
     showTime.textContent = funMovie.showtime; 
     // available tickets =capacity - tickets sold 
     const tickets  = document.querySelector('#ticket-number') 
     tickets.textContent = funMovie.capacity -funMovie.tickets_sold; 
 } 
 // //Sold out 
 const btn = document.getElementById('buy-ticket') 
         btn.addEventListener('click', function(event){ 
             let remainingTickets = document.querySelector('#ticket-number').textContent 
             event.preventDefault() 
             if(remainingTickets > 0){ 
                 document.querySelector('#ticket-number').textContent  = remainingTickets-1 
             } 
             else if(parseInt(remTickets, 10)===0){ 
                 btn.textContent = 'Sold Out' 
             } 
     })