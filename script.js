"use strict";

// Duomenis pasiimsime iš: https://magnetic-melon-yam.glitch.me
//     1. Naudojant tik JS, sukurkite lentelę ir į ją įrašykite duomenis (id, name, city, fav_color).
//     2. Naudojant JS metodus, padalinkite vardą į dvi dalis: vardą ir pavardę (lentelėje).
//     3. Pridėkite prie lentelės (tarp id ir name) nuotrauką.
//     4. Sukurkite checkbox virš lentelės su JS. Jį paspaudus, rodys tik tuos žmones, kurie yra VIP.
//     5. Sukurkite virš lentelės ir search laukelį (forma su input type search ir mygtukas). Suvedus duomenis, lentelėje turi prasifiltruoti pagal vardą arba pavardę (fullname contains search string). Capitalizacija turėtų būti nesvarbi.
//     6. Stilizuoti visą puslapį, padaryti patogų UI (matosi visi užrašai, aiškūs lentelės duomenys). UI elementus (mygtukus, input'us) sucentruoti. Pridėti spalvas.
//     7. Surikiuoti lentelę pagal stulpelį paspaudus ant stulpelio pavadinimo. Nuotraukos stulpelio galime nerūšiuoti.

const URLDATA = "https://magnetic-melon-yam.glitch.me";

fetch(URLDATA)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    drawTable(data);

    function onlyVip() {
      const checkboxMarked = document.getElementById("VIP").checked;
      checkboxMarked
        ? drawTable(
            data.filter((i) => {
              return i.vip === true;
            })
          )
        : drawTable(data);
    }

    document.getElementById("VIP").addEventListener("change", onlyVip);

    function findNameSurname(event) {
      event.preventDefault();
      const searchForm = document
        .getElementById("searchValue")
        .value.toLowerCase();
      drawTable(
        data.filter((item) => {
          return item.name.toLowerCase().includes(searchForm);
        })
      );
    }

    document.getElementById("form").addEventListener("submit", findNameSurname);

    function sortTable() {
      drawTable(
        data.sort((item1, item2) => {
          if (item1.name < item2.name) {
            return -1;
          }
          if (item1.name > item2.name) {
            return 1;
          }
          return 0;
        })
      );
    }

    document.querySelector("thead").addEventListener("click", sortTable);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// checkbox & label add
const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.id = "VIP";

const labelCheckbox = document.createElement("label");
labelCheckbox.textContent = "Only VIP";
document.body.append(labelCheckbox, checkbox);

// search form add
const inputSearch = document.createElement("input");
inputSearch.type = "";
inputSearch.id = "searchValue";
inputSearch.placeholder = "Enter Name/Surname";

const inputSubmit = document.createElement("input");
inputSubmit.type = "submit";
inputSubmit.id = "button";
inputSubmit.value = "search";

const form = document.createElement("form");
form.id = "form";
form.style.margin = "10px 0px";
form.append(inputSearch, inputSubmit);
document.body.append(form);

// Table pridejimas i body.
function tableForm() {
  const table = document.createElement("table");
  table.style.border = "1px solid";

  const thead = document.createElement("thead");
  thead.style.cursor = "pointer";

  const tbody = document.createElement("tbody");

  const theadTr = document.createElement("tr");

  const theadId = document.createElement("th");
  theadId.style.border = "1px solid";
  theadId.textContent = "ID";

  const theadName = document.createElement("th");
  theadName.textContent = "NAME";
  theadName.style.border = "1px solid";

  const theadSurname = document.createElement("th");
  theadSurname.textContent = "SURNAME";
  theadSurname.style.border = "1px solid";

  const theadCity = document.createElement("th");
  theadCity.textContent = "CITY";
  theadCity.style.border = "1px solid";

  const theadColor = document.createElement("th");
  theadColor.textContent = "COLOR";
  theadColor.style.border = "1px solid";

  table.append(thead, tbody);
  thead.append(theadTr);
  theadTr.append(theadId, theadName, theadSurname, theadCity, theadColor);
  document.body.append(table);
}
tableForm();

// Data pridejimas i Table.
function drawTable(data) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  data.forEach((item) => {
    const tbodyTr = document.createElement("tr");

    const id = document.createElement("th");
    id.innerHTML = item.id;
    id.style.border = "1px solid";

    const splitName = item.name.split(" ");

    const name = document.createElement("th");
    name.innerHTML = splitName[0];
    name.style.border = "1px solid";

    const surname = document.createElement("th");
    surname.innerHTML = splitName[1];
    surname.style.border = "1px solid";

    const city = document.createElement("th");
    city.innerHTML = item.city;
    city.style.border = "1px solid";

    const color = document.createElement("th");
    color.innerHTML = item.fav_color;
    color.style.border = "1px solid";

    tbodyTr.append(id, name, surname, city, color);
    tbody.append(tbodyTr);
  });
}
