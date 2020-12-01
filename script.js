const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count= document.getElementById('count');
const total= document.getElementById('total');
const movieSelect= document.getElementById('movies');

let ticketPrice=+movieSelect.value;

populateUI();

function updateSelectCount() {
    const selectSeats = document.querySelectorAll('.row .seat.selected');

    let seatIndex = [...selectSeats].map(item => {
        return [...seats].indexOf(item);
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex)); 

    const selectSeatsCount = selectSeats.length;
    count.innerText=selectSeatsCount;
    ticketPrice=+movieSelect.value;
    total.innerText=selectSeatsCount*ticketPrice;
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length!==0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index)>-1) {
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex!== null) {
        movieSelect.selectedIndex=selectedMovieIndex;
    }
    updateSelectCount();
}

function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);  
}

movieSelect.addEventListener('change', (e) => {
    ticketPrice=+e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectCount();
})

container.addEventListener('click', (e) => {
    if(!e.target.classList.contains('occupied') &&
        e.target.classList.contains('seat'))
        {
            e.target.classList.toggle('selected');

            updateSelectCount();
        }
})

updateSelectCount();