'use strict'

const input = document.querySelector('#tekst');
const btn = document.querySelector('#dodaj');

const addItem = () => {
    console.log(input.value);

    // 1. napravi div za novi item
    // 2. dodaj checkbox
    // 3. dodaj tekst
    // 4. dodaj X za brisanje
    // 5. akcija na klik na tekst i checkbox -> (ne)prekrižiti tekst
    // 6. akcija na klik na X -> obisati item
}

btn.addEventListener('click', addItem);

 // opcionalno -> brisanje svih gotovih taskova odjednom
