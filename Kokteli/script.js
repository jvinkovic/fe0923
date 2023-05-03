'use strict'

// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
const baseApiPath = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
//https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
const baseApiDetailsPath = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const btn = document.getElementById('search-btn');
const input = document.querySelector('#search');
const autoCheckbox = document.querySelector('#chk-auto');

const listDiv = document.querySelector('#list');
const instructionsDiv = document.querySelector('#instructions');

autoCheckbox.setAttribute('checked', 'true');

const xhr = new XMLHttpRequest();

const showCoctailDetails = (e) => {
    const json = e.target.response;
    const data = JSON.parse(json);
    const coctailData = data.drinks[0];

    // stavi sliku
    // TODO

    // stavi upute
    const instructions = coctailData.strInstructions;
    instructionsDiv.innerText = instructions;

    // stavi sastojke
    // TODO
}

const handleCoctailDetails = (e) => {
    const id = e.target.getAttribute('c-id');
    const detailsUrl = baseApiDetailsPath + id;
    xhr.open('GET', detailsUrl, true)
    xhr.onload = showCoctailDetails;
    xhr.send();
}

const showData = (e) => {
    // 2. ispiši rezultat
        // 2.1. napravi ul sa imenima koktela
        // 2.2. dodaj taj ul na stranicu

    const json = e.target.response;
    const data = JSON.parse(json);

    const drinkList = data.drinks;   

    if(drinkList !== null){
        const ulElement = document.createElement('ul');

        for(let i = 0; i < drinkList.length; i++){
            const name = drinkList[i].strDrink;
            const id = drinkList[i].idDrink;

            const liElement = document.createElement('li');
            liElement.innerText = name;
            liElement.addEventListener('click', handleCoctailDetails);
            liElement.setAttribute('c-id', id);

            ulElement.append(liElement);
        }
        
        listDiv.innerHTML = '';
        listDiv.append(ulElement);
    } else {
        listDiv.innerText = 'Nema!';
    }
}

const search = () => {
    // 1. pitaj api
        // 1.1. pročitaj što je u inputu
        // 1.2. napravi url na koji treba pitati
        // 1.3. napravi request

    const query = input.value;
    const queryUrl = baseApiPath + query;
    
    xhr.abort();
    xhr.open('GET', queryUrl, true);
    xhr.onload = showData;
    xhr.send();

    listDiv.innerText = 'Loading...';
}

const handleInputKey = (e) => {
    // ako je enter (kod 13)
    if(e.keyCode === 13) {
        search();
    }
}

const handleInputChange = () => {
    if(autoCheckbox.checked) {
        search();
    }
}

btn.addEventListener('click', search);
input.addEventListener('input', handleInputChange);
input.addEventListener('keyup', handleInputKey);
