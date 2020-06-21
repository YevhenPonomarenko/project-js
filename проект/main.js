const URL = 'http://swapi.dev/api';
let people = [];
let nextUrl = `${URL}/people`;
let prevUrl = null;
const personElement = document.getElementById('person');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

const getAllPeople = async (type) => {
    await fetch(type === 'next' ? nextUrl : prevUrl)
        .then(res => res.json())
        .then(data => {
            nextUrl = data.next;
            prevUrl = data.previous;

            watchButton();

            personElement.innerHTML = '';
            people = data.results;
            people.forEach(item => {
                const pers = document.createElement('div');

                pers.innerHTML = 'Name: ' + item.name + '<br>' + 'height: ' + item.height + '<br>' + 
                'mass:' + item.mass;


                personElement.appendChild(pers);
            });
        })
        .catch(e => console.log(e, 'getAllPeople error'))
};

prevButton.addEventListener('click', () => getAllPeople('prev'));
nextButton.addEventListener('click', () => getAllPeople('next'));

const watchButton = () => {
    if (!prevUrl) {
        prevButton.style.visibility = 'hidden';
    } else {
        prevButton.style.visibility = 'visible';
    }

    if (!nextUrl) {
        nextButton.style.visibility = 'hidden';
    } else {
        nextButton.style.visibility = 'visible';
    }
};

window.onload = () => {
  getAllPeople('next');
    watchButton();
};