//Regex

document.getElementById(`btn`).addEventListener(`click`, function () {
  let ime = document.getElementById(`ime`).value;
  let prezime = document.getElementById(`prezime`).value;
  let email = document.getElementById("email");
  let paternIme = new RegExp(/^[A-ZĆČĐŽŠ][a-zćčđžš]{1,15}$/);
  let paternPrezime = new RegExp(
    /^[A-ZĆČĐŽŠ][a-zćčđžš]+(\s[A-ZĆČĐŽŠ][a-zćčđžš]+){0,2}$/
  );
  let paternEmail = new RegExp(/[^!#$%^&*()?-]/);

  if (paternIme.test(ime)) {
    document.getElementById(`check_ime`).style.display = `block`;
    document.getElementById(`check_ime`).innerHTML = `&#10004;`;
    document.getElementById(`check_ime`).style.color = `springgreen`;
  } else {
    document.getElementById(`check_ime`).style.display = `block`;
    document.getElementById(`check_ime`).innerHTML = `&#10005;`;
    document.getElementById(`check_ime`).style.color = `red`;
  }
  if (paternPrezime.test(prezime)) {
    document.getElementById(`check_prezime`).style.display = `block`;
    document.getElementById(`check_prezime`).innerHTML = `&#10004;`;
    document.getElementById(`check_prezime`).style.color = `springgreen`;
  } else {
    document.getElementById(`check_prezime`).style.display = `block`;
    document.getElementById(`check_prezime`).innerHTML = `&#10005;`;
    document.getElementById(`check_prezime`).style.color = `red`;
  }
  if (paternEmail.test(email)) {
    document.getElementById(`check_email`).style.display = `block`;
    document.getElementById(`check_email`).innerHTML = `&#10004;`;
    document.getElementById(`check_email`).style.color = `springgreen`;
  } else {
    document.getElementById(`check_email`).style.display = `block`;
    document.getElementById(`check_email`).innerHTML = `&#10005;`;
    document.getElementById(`check_email`).style.color = `red`;
  }
});

//Carousel

//Preuzimanje JSON-a sa slikama

nizObjekata = [];

window.onload = function dohvatiPodatke() {
  let zahtev = new XMLHttpRequest();
  nizSrc = [];
  zahtev.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      nizObjekata = JSON.parse(this.responseText);

      for (i = 0; i < nizObjekata.length; i++) {
        nizSrc.push(nizObjekata[i].src);
      }
      return nizSrc;
    }
  };
  zahtev.open("GET", "../data/carousel/carousel.json");
  zahtev.send();

  if (this.status >= 400) {
    let greska = new Error(`Zahtev nije ispunjen`);
    alert(greska);
  }
};

// Automatsko menjanje slika

brojac = 0;
function menjanjeSlika() {
  const container = document.getElementById("carouselContainer");
  brojac++;
  if (brojac > nizSrc.length - 1) brojac = 0;
  container.style.backgroundImage = `url("data/carousel/${nizSrc[brojac]}")`;
}
setInterval(menjanjeSlika, 10000);

// Ispis menija

// dohvatanje dugmica

dugmici = document.querySelectorAll(`.btn`);

// dinamicki ispis menija

for (i = 0; i < dugmici.length; i++) {
  dugmici[i].addEventListener(`click`, function Menu() {
    // dohvatanje menija
    vrsta_jela = this.id;
    dohvatanjeMenija(vrsta_jela);
    function dohvatanjeMenija(vrsta_jela) {
      let zahtev = new XMLHttpRequest();
      zahtev.onreadystatechange = function IspisMenija(objekat) {
        if (this.readyState == 4 && this.status == 200) {
          objekat = JSON.parse(this.responseText);
          izbori = objekat.izbor;

          // ispis menija
          ispisLista = document.getElementById(`dinamickaLista`);
          ispisLista.innerHTML = `
          <h3 id="naslovListe">${objekat.vrsta}</h3>          
          <ul id="ispis_d_liste">`;
          // petlja za konkatenaciju ispisa <li> elementima
          for (i = 0; i < izbori.length; i++) {
            ispisLista.innerHTML += `<li id=${objekat.vrsta}${i} class="liste"><strong class="jelo">${izbori[i].ime}</strong><span>....................................................<strong>${izbori[i].cena}</strong> din</span></li>`;
          }
          // zatvaranje ul i ispis digmica za filter i sort
          ispisLista.innerHTML += `<ul>
          
          <button id="sort">Sortiraj</button> 
          <button id="filter">Posno</button>          
          `;
        }

        // funkcija za priakz slika
        liste = document.querySelectorAll(`.liste`);
        for (i = 0; i < liste.length; i++) {
          liste[i].addEventListener(`click`, function prikaziSliku() {
            id = this.id;
            vrsta = id.slice(0, -1); // slajsovanje svojstva id za posledni karakter, odnosno cifru da bi se dobilo ime foldera za putanju
            document.getElementById(
              `menuSlika`
            ).style.backgroundImage = `url("data/menu/${vrsta}/${id}.jpg")`;
          });
        }

        // funkcija za filtriranje posnih jela
        document
          .getElementById(`filter`)
          .addEventListener(`click`, function filtriraj() {
            izbori = izbori.filter(function (element) {
              if (element.posno == true) {
                return element;
              }
            });

            // ispis filtriranog menija menija
            ispisLista = document.getElementById(`dinamickaLista`);
            ispisLista.innerHTML = `
          <h3 id="naslovListe">${objekat.vrsta}</h3>          
          <ul id="ispis_d_liste">`;

            for (i = 0; i < izbori.length; i++) {
              ispisLista.innerHTML += `<li id=${objekat.vrsta}${i} class="liste"><strong class="jelo">${izbori[i].ime}</strong><span>....................................................<strong>${izbori[i].cena}</strong> din</span></li>`;
            }

            ispisLista.innerHTML += `<ul>
          
          <button id="sort">Sortiraj</button>
          <button id="filter">Posno</button>          
          `;
          });

        //funkcija za sortiranje prema ceni

        document.getElementById(`sort`).addEventListener(`click`, sortiraj);

        function sortiraj() {
          izbori.sort(function (a, b) {
            return a.cena - b.cena;
          });
          // ispis sortiranog menija
          ispisLista = document.getElementById(`dinamickaLista`);
          ispisLista.innerHTML = `
                    <h3 id="naslovListe">${objekat.vrsta}</h3>          
                    <ul id="ispis_d_liste">`;

          for (i = 0; i < izbori.length; i++) {
            ispisLista.innerHTML += `<li id=${objekat.vrsta}${i} class="liste"><strong class="jelo">${izbori[i].ime}</strong><span>....................................................<strong>${izbori[i].cena}</strong> din</span></li>`;
          }

          ispisLista.innerHTML += `<ul>
                    
                    <button id="sort">Sortiraj</button>
                    <button id="filter">Posno</button>          
                    `;
        }
        // ukoliko se javi greska pri preuzimanju jsona
        if (this.status >= 400) {
          let greska = new Error(`Zahtev nije ispunjen`);
          alert(greska);
        }
      };
      //putanja do jsona prema vrsti jela
      zahtev.open("GET", `data/menu/${vrsta_jela}/${vrsta_jela}.json`);
      //zatvaranje zahteva
      zahtev.send();
    }
  });
}

// document
//   .getElementById(`filter`)
//   .addEventListener(`click`, function filtriraj() {
//     for (i = 0; i < liste.length; i++) {
//       if (liste[i].classList.contains(`false`)) {
//         liste[i].style.display = `none`;
//       }
//     }
//   });
