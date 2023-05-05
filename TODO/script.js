'use strict'

const input = document.querySelector('#tekst');
const btn = document.querySelector('#dodaj');
const brisiBtn = document.querySelector('#brisi-btn');
const lista = document.querySelector('#lista');

const handleDelete = (e) => {
    const elementForDeletion = e.target.parentElement;
    elementForDeletion.remove();
}

const handleStrikeItem = (e) => {
    const itemInput = e.target;
    const spanElement = itemInput.nextElementSibling;
    spanElement.classList.toggle('crossed');
}

const addItem = () => {
    const txt = input.value.trim();
    if(txt.length < 1) {
        return;
    }

    // 1. napravi div za novi item
    const newDiv = document.createElement('div');

    // 2. checkbox
    const chkInput = document.createElement('input');
    chkInput.setAttribute('type', 'checkbox');    

    // 3. tekst
    const span = document.createElement('span');
    span.innerText = txt;    

    // checkbox i tekst staviti u label i taj label u div
    const label = document.createElement('label');
    label.append(chkInput);
    label.append(span);
    newDiv.append(label);

    // 4. dodaj X za brisanje - u div
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'X';
    deleteBtn.setAttribute('style', 'color: red; font-weight: bold;');
    newDiv.append(deleteBtn);

    // 5. akcija na klik na X -> obrisati item
    deleteBtn.addEventListener('click', handleDelete);
    // deleteBtn.addEventListener('click', () => {
    //     newDiv.remove();
    // });

    // 6. akcija na klik na tekst i checkbox -> (ne)prekrižiti tekst
    chkInput.addEventListener('change', handleStrikeItem);
    // chkInput.addEventListener('change', () => {
    //     span.classList.toggle('crossed');
    // });

    // 7. dodati div na stranicu
    lista.append(newDiv);

    input.value = '';
}

btn.addEventListener('click', addItem);

// brisanje svih gotovih taskova odjednom -----

const handleBrisiSve = () => {
    const toRemoveList = document.querySelectorAll('span.crossed');
    for(let i = 0; i < toRemoveList.length; i++) {
        const item = toRemoveList[i];
        item.parentElement.parentElement.remove();
    }
}

const handleBrisiSveAlternativno = () => {   
    const elementList = lista.children;
    const toRemove = [];
    for(let i = 0; i < elementList.length; i++) {
        const element = elementList[i];
        const shouldRemove = element.children[0].children[1].classList.contains('crossed');
        if(shouldRemove) {
            toRemove.push(element);
        }
    }

    for(const x of toRemove){
        x.remove();
    }
}

brisiBtn.addEventListener('click', handleBrisiSve);
