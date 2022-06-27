//Preuzimanje jsona sa podacima o stolovima

nizStolova = [];

window.onload = function dohvatiPodatke() {
  let zahtev = new XMLHttpRequest();
  zahtev.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      nizStolova = JSON.parse(this.responseText);
    }
  };
  zahtev.open("GET", "../data/tables/tables.json");
  zahtev.send();

  if (this.status >= 400) {
    let greska = new Error(`Zahtev nije ispunjen`);
    alert(greska);
  }
};

//pokupljanje id stolova

let tableID = ``;
var stolovi = document.querySelectorAll(`.table`);
for (i = 0; i < stolovi.length; i++) {
  stolovi[i].addEventListener(`click`, function uzmiId() {
    tableID = this.id;
    return tableID;
  });
}

// menjanje stila prilikom klika

for (i = 0; i < stolovi.length; i++) {
  stolovi[i].addEventListener(`click`, function promeniBoju() {
    this.style.color = `violet`;
  });
}

//vrednosti iz forme

ime = document.getElementById(`name`).value;
console.log(ime);
prezime = document.getElementById(`surname`).value;
number = document.getElementById(`number`).value;
date = document.getElementById(`date`).value;
time = document.getElementById(`time`).value;
message = document.getElementById(`ta`).value;
btn = document.getElementById(`confirm`).value;

console.log(ime);
console.log(prezime);
console.log(number);
console.log(date);
