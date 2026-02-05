import pokemons from "./pokemons.js";

const kartochki = document.querySelector('.kartochki');
const inpuSearch = document.querySelector('.inpuSearch');
const typeFilter = document.querySelector('#typeFilter');
const fromWeight = document.querySelector('#fromWeight');
const toWeight = document.querySelector('#toWeight');
const sortSelect = document.querySelector('.sortSelect');
const btn = document.querySelector('.btn');

function fillTypes() {
    let types = [];
    pokemons.forEach(poke => {
        poke.type.forEach(t => {
            if (!types.includes(t)) types.push(t);
        });
    });
    types.sort().forEach(type => {
        let option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        typeFilter.appendChild(option);
    });
}

function generator(massiv) {
    kartochki.innerHTML = '';
    massiv.forEach(element => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('card');
        newDiv.innerHTML = `
            <span class="star">☆</span>
            <div class="id-badge">${element.num}</div>
            <h2>${element.name}</h2>
            <img src="${element.img}" alt="${element.name}">
            <div class="type-pill">${element.type.join(' ')}</div>
            <p>Candy count: ${element.candy_count || 'N/A'}</p>
            <p><b>${element.weight}</b></p>
            <p class="weaknesses">${element.weaknesses.join(' ')}</p>
            <div class="time-badge">${element.spawn_time}</div>
        `;
        kartochki.appendChild(newDiv);
    });
}

function filterAll() {
    let searchVal = inpuSearch.value.toLowerCase().trim();
    let typeVal = typeFilter.value;
    let fromVal = parseFloat(fromWeight.value) || 0;
    let toVal = parseFloat(toWeight.value) || Infinity;
    let sortVal = sortSelect.value;

    let filtered = pokemons.filter(poke => {
        let pokeWeight = parseFloat(poke.weight);
        let matchesSearch = poke.name.toLowerCase().includes(searchVal);
        let matchesType = typeVal === 'all' || poke.type.includes(typeVal);
        let matchesWeight = pokeWeight >= fromVal && pokeWeight <= toVal;

        return matchesSearch && matchesType && matchesWeight;
    });

    if (sortVal === "ABC") filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sortVal === "CBA") filtered.sort((a, b) => b.name.localeCompare(a.name));
    if (sortVal === "BIG") filtered.sort((a, b) => parseFloat(b.weight) - parseFloat(a.weight));
    if (sortVal === "SMALL") filtered.sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight));

    generator(filtered);
}

btn.addEventListener('click', filterAll);
inpuSearch.addEventListener('input', filterAll);
typeFilter.addEventListener('change', filterAll);
sortSelect.addEventListener('change', filterAll);

fillTypes();
generator(pokemons);