let assert = chai.assert;
describe('Raspored', function() {

  describe('iscrtajRaspored()', function() {

    it('Broj kolona tabele odgovara broju elemenata parametra dani', function() {
      let okvir1 = document.createElement("DIV");
      let okvir2 = document.createElement("DIV");
      okvir1.setAttribute("id", "okvir1");
      okvir2.setAttribute("id", "okvir2");
      Raspored.iscrtajRaspored(okvir1, ['Ponedjeljak', 'Utorak', 'Srijeda', 'Cetvrtak', 'Petak'], 8, 21);
      Raspored.iscrtajRaspored(okvir2, ['Utorak', 'Srijeda', 'Petak'], 6, 17);
      let table1 = okvir1.firstChild;
      let table2 = okvir2.firstChild;

      assert.equal(table1.childElementCount - 1, 5, "Broj redova treba biti 5");
      assert.equal(table2.childElementCount - 1, 3, "Broj redova treba biti 3");
    });
    
    it('Pocetni sat na tabeli odgovara parametru satPocetak', function() {
      let okvir1 = document.createElement("DIV");
      let okvir2 = document.createElement("DIV");
      okvir1.setAttribute("id", "okvir1");
      okvir2.setAttribute("id", "okvir2");
      Raspored.iscrtajRaspored(okvir1, ['Ponedjeljak', 'Utorak', 'Srijeda', 'Cetvrtak', 'Petak'], 8, 21);
      Raspored.iscrtajRaspored(okvir2, ['Utorak', 'Srijeda', 'Petak'], 6, 17);
      let table1 = okvir1.firstChild;
      let table2 = okvir2.firstChild;
      let red1 = table1.firstChild;
      let red2 = table2.firstChild;
      assert.equal(parseInt(red1.childNodes[1].innerHTML), 8, "Pocetni sat treba biti 8");
      assert.equal(parseInt(red2.childNodes[1].innerHTML), 6, "Pocetni sat treba biti 6");
    });
    
    it('Zadnji sat na tabeli odgovara parametru satKraj', function() {
      let okvir1 = document.createElement("DIV");
      let okvir2 = document.createElement("DIV");
      okvir1.setAttribute("id", "okvir1");
      okvir2.setAttribute("id", "okvir2");
      Raspored.iscrtajRaspored(okvir1, ['Ponedjeljak', 'Utorak', 'Srijeda', 'Cetvrtak', 'Petak'], 8, 21);
      Raspored.iscrtajRaspored(okvir2, ['Utorak', 'Srijeda', 'Petak'], 6, 17);
      let table1 = okvir1.firstChild;
      let table2 = okvir2.firstChild;
      let red1 = table1.firstChild;
      let red2 = table2.firstChild;
      assert.equal(parseInt(red1.childNodes[(21-8)+1].innerHTML), 21, "Zadnji sat treba biti 21");
      assert.equal(parseInt(red2.childNodes[(17-6)+1].innerHTML), 17, "Zadnji sat treba biti 17");
    });
    
    it('Parametar satPocetak mora biti manji od parametra satKraj', function() {
      let okvir1 = document.createElement("DIV");
      okvir1.setAttribute("id", "okvir1");
      var x1 = Raspored.iscrtajRaspored(okvir1, ['Ponedjeljak', 'Utorak', 'Srijeda', 'Cetvrtak', 'Petak'], 8, 8);
      assert.equal(x1, "Greska", "satPocetak ne moze biti jednak satKraj");
      var x1 = Raspored.iscrtajRaspored(okvir1, ['Utorak', 'Srijeda', 'Petak'], 17, 6);
      assert.equal(x1, "Greska", "satPocetak ne moze biti veci od satKraj"); 
    });
    
    it('Parametri satPocetak i satKraj moraju biti pozitivni brojevi u rasponu 0-24', function() {
      let okvir1 = document.createElement("DIV");
      okvir1.setAttribute("id", "okvir1");
      var x1 = Raspored.iscrtajRaspored(okvir1, ['Ponedjeljak', 'Utorak', 'Srijeda', 'Cetvrtak', 'Petak'], -8, 21);
      assert.equal(x1, "Greska", "Parametar satPocetak ne moze biti negativan");
      var x1 = Raspored.iscrtajRaspored(okvir1, ['Ponedjeljak', 'Utorak', 'Srijeda', 'Cetvrtak', 'Petak'], 8, -21);
      assert.equal(x1, "Greska", "Parametar satKraj ne moze biti negativan");
      var x1 = Raspored.iscrtajRaspored(okvir1, ['Utorak', 'Srijeda', 'Petak'], 25, 28);
      assert.equal(x1, "Greska", "satPocetak ne moze biti veci od 24");
      var x1 = Raspored.iscrtajRaspored(okvir1, ['Utorak', 'Srijeda', 'Petak'], 22, 28);
      assert.equal(x1, "Greska", "satKraj ne moze biti veci od 24"); 
   });
   
   it('Parametri satPocetak i satKraj moraju biti cijeli brojevi', function() {
      let okvir1 = document.createElement("DIV");
      okvir1.setAttribute("id", "okvir1");
      var x1 = Raspored.iscrtajRaspored(okvir1, ['Ponedjeljak', 'Utorak', 'Srijeda', 'Cetvrtak', 'Petak'], 8.5, 21);
      assert.equal(x1, "Greska", "Parametar satPocetak mora biti cijeli broj");
      var x1 = Raspored.iscrtajRaspored(okvir1, ['Ponedjeljak', 'Utorak', 'Srijeda', 'Cetvrtak', 'Petak'], 8, 21.5);
      assert.equal(x1, "Greska", "Parametar satKraj mora biti cijeli broj");
      var x1 = Raspored.iscrtajRaspored(okvir1, ['Utorak', 'Srijeda', 'Petak'], 6.5, 17.5);
      assert.equal(x1, "Greska", "Parametri moraju biti cijeli brojevi");
   });
	
  it('Ako parametar dani predstavlja niz sa jednim elementom onda tabela ima samo jedan red', function() {
      let okvir1 = document.createElement("DIV");
      let okvir2 = document.createElement("DIV");
      okvir1.setAttribute("id", "okvir1");
      okvir2.setAttribute("id", "okvir2");
      Raspored.iscrtajRaspored(okvir1, ['Ponedjeljak'], 8, 21);
      Raspored.iscrtajRaspored(okvir2, ['Srijeda'], 6, 17);
      let table1 = okvir1.firstChild;
      let red1 = table1.childNodes[1];
      let cell1 = red1.childNodes[0];
      let table2 = okvir2.firstChild;
			let red2 = table2.childNodes[1];
      let cell2 = red2.childNodes[0];
    
      assert.equal(table1.childElementCount - 1, 1, "Broj redova treba biti 1");
      assert.equal(cell1.innerHTML, "Ponedjeljak", "Dan treba biti ponedjeljak");
      assert.equal(table2.childElementCount - 1, 1, "Broj redova treba biti 1");
      assert.equal(cell2.innerHTML, "Srijeda", "Dan treba biti srijeda");
   });
   
   it('Granicni slucaj za raspored 0-24', function() {
      let okvir1 = document.createElement("DIV");
      okvir1.setAttribute("id", "okvir1");
      Raspored.iscrtajRaspored(okvir1, ['Ponedjeljak', 'Utorak', 'Srijeda', 'Cetvrtak', 'Petak'], 0, 24);
      let table1 = okvir1.firstChild;
     	let red1 = table1.firstChild;
      assert.equal(parseInt(red1.childNodes[1].innerHTML), 0, "Prvi sat treba biti 0");
      assert.equal(parseInt(red1.childNodes[24].innerHTML), 23, "Zadnji sat treba biti 23");
    });
    
    it('Sati manji od 10 trebaju biti prikazani sa nulom ispred njih, svi sati trebaju iza imati :00', function() {
      let okvir1 = document.createElement("DIV");
      let okvir2 = document.createElement("DIV");
      okvir1.setAttribute("id", "okvir1");
      okvir2.setAttribute("id", "okvir2");
      Raspored.iscrtajRaspored(okvir1, ['Ponedjeljak', 'Utorak', 'Srijeda', 'Cetvrtak', 'Petak'], 8, 21);
      Raspored.iscrtajRaspored(okvir2, ['Utorak', 'Srijeda', 'Petak'], 4, 8);
      let table1 = okvir1.firstChild;
      let table2 = okvir2.firstChild;
     	let red1 = table1.firstChild;
      let red2 = table2.firstChild;
      assert.equal(red1.childNodes[1].innerHTML, "08:00", "Prvi sat treba biti formata 08:00");
      assert.equal(red1.childNodes[(21-8)+1].innerHTML, "21:00", "Zadnji sat treba biti formata 21:00");
      assert.equal(red2.childNodes[1].innerHTML, "04:00", "Prvi sat treba biti formata 04:00");
      assert.equal(red2.childNodes[(8-4)+1].innerHTML, "08:00", "Zadnji sat treba biti formata 08:00");
 });
 
 it('Prikaz sati samo za 0,2,4,6,8,10,12,15,17,19,21,23', function() {
      let okvir1 = document.createElement("DIV");
      okvir1.setAttribute("id", "okvir1");
      Raspored.iscrtajRaspored(okvir1, ['Ponedjeljak', 'Utorak', 'Srijeda', 'Cetvrtak', 'Petak'], 0, 24);
      let table1 = okvir1.firstChild;
     	let red1 = table1.firstChild;
     	for(var i=1; i<=24; i++) 
        if(parseInt(red1.childNodes[i].innerHTML!="NaN"))
        	assert.equal(parseInt(red1.childNodes[i].innerHTML), i-1, "Sati trebaju odgovarati naznacenim brojevima");
   });
 

   
  });

	describe('dodajAktivnost()', function() {

	it('Naziv i tip aktivnosti moraju odgovarati parametrima naziv i tip', function() {
      let okvir1 = document.createElement("DIV");
      let okvir2 = document.createElement("DIV");
      okvir1.setAttribute("id", "okvir1");
      okvir2.setAttribute("id", "okvir2");   
      Raspored.iscrtajRaspored(okvir1, ['Ponedjeljak', 'Utorak', 'Srijeda', 'Cetvrtak', 'Petak'], 8, 21);
      Raspored.iscrtajRaspored(okvir2, ['Utorak', 'Srijeda', 'Petak'], 6, 17);
      Raspored.dodajAktivnost(okvir1, 'WT', 'predavanje', 9, 12, 'Ponedjeljak');
     	Raspored.dodajAktivnost(okvir2, 'RMA', 'vjezbe', 6, 8.5, 'Utorak');
      let table1 = okvir1.firstChild;
      let table2 = okvir2.firstChild;
      let red1 = table1.childNodes[1];
      let red2 = table2.childNodes[1];
      assert.equal(red1.childNodes[3].innerText, "WT\npredavanje", "Naziv aktivnosti treba biti WT, tip treba biti predavanje");
      assert.equal(red2.childNodes[1].innerText, "RMA\nvjezbe", "Naziv aktivnosti treba biti RMA, tip treba biti vjezbe");
   });
   
   it('Raspored mora biti napravljen/ne smije biti null', function() {
      let okvir1 = document.createElement("DIV");
      okvir1.setAttribute("id", "okvir1");
      //Raspored.iscrtajRaspored(okvir1, ['Ponedjeljak', 'Utorak', 'Srijeda', 'Cetvrtak', 'Petak'], 8, 21);
      var x = Raspored.dodajAktivnost(okvir1, 'WT', 'predavanje', 9, 12, 'Ponedjeljak');
      assert.equal(x, "Greska - raspored nije kreiran", "Raspored mora imati tabelu");
      var x = Raspored.dodajAktivnost(null, 'WT', 'predavanje', 9, 12, 'Ponedjeljak');
      assert.equal(x, "Greska - raspored nije kreiran", "Raspored mora imati tabelu");
   });
   
   it('Termin aktivnosti se ne smije preklapati niti presjecati sa terminima drugih aktivnosti', function() {
      let okvir1 = document.createElement("DIV");
      okvir1.setAttribute("id", "okvir1");
      Raspored.iscrtajRaspored(okvir1, ['Ponedjeljak', 'Utorak', 'Srijeda', 'Cetvrtak', 'Petak'], 8, 21);
      Raspored.dodajAktivnost(okvir1, 'WT', 'predavanje', 9, 12, 'Ponedjeljak');
      var x = Raspored.dodajAktivnost(okvir1, 'WT', 'vjezbe', 11, 13, 'Ponedjeljak')
      assert.equal(x, "Greska - vec postoji termin u rasporedu u zadanom vremenu", "Termin ne smije biti zauzet");
      var x = Raspored.dodajAktivnost(okvir1, 'WT', 'vjezbe', 9, 12, 'Ponedjeljak')
      assert.equal(x, "Greska - vec postoji termin u rasporedu u zadanom vremenu", "Termin ne smije biti zauzet");
      var x = Raspored.dodajAktivnost(okvir1, 'WT', 'vjezbe', 8, 11.5, 'Ponedjeljak')
      assert.equal(x, "Greska - vec postoji termin u rasporedu u zadanom vremenu", "Termin ne smije biti zauzet");
   });
   
   it('Parametri vrijemePocetak i vrijemeKraj moraju biti u rasponu 0-24', function() {
      let okvir1 = document.createElement("DIV");
      okvir1.setAttribute("id", "okvir1");
      Raspored.iscrtajRaspored(okvir1, ['Ponedjeljak', 'Utorak', 'Srijeda', 'Cetvrtak', 'Petak'], 8, 21);
      var x = Raspored.dodajAktivnost(okvir1, 'WT', 'predavanje', 7, 12, 'Ponedjeljak');
      assert.equal(x, "Greska - u rasporedu ne postoji dan ili vrijeme u kojem pokusavate dodati termin", "Validno vrijeme");
      var x = Raspored.dodajAktivnost(okvir1, 'WT', 'predavanje', 8, 22, 'Ponedjeljak');
      assert.equal(x, "Greska - u rasporedu ne postoji dan ili vrijeme u kojem pokusavate dodati termin", "Validno vrijeme");
      var x = Raspored.dodajAktivnost(okvir1, 'WT', 'predavanje', 12, 9, 'Ponedjeljak');
      assert.equal(x, "Greska - u rasporedu ne postoji dan ili vrijeme u kojem pokusavate dodati termin", "Validno vrijeme");
   });
   
   
   
   it('Parametar vrijemePocetak ne smije biti veci ili jedank parametru vrijemeKraj', function() {
      let okvir1 = document.createElement("DIV");
      okvir1.setAttribute("id", "okvir1");
      Raspored.iscrtajRaspored(okvir1, ['Ponedjeljak', 'Utorak', 'Srijeda', 'Cetvrtak', 'Petak'], 8, 21);
      var x = Raspored.dodajAktivnost(okvir1, 'WT', 'predavanje', 8, 8, 'Ponedjeljak');
      assert.equal(x, "Greska - u rasporedu ne postoji dan ili vrijeme u kojem pokusavate dodati termin", "Validno vrijeme");
      var x = Raspored.dodajAktivnost(okvir1, 'WT', 'predavanje', 12, 9, 'Ponedjeljak');
      assert.equal(x, "Greska - u rasporedu ne postoji dan ili vrijeme u kojem pokusavate dodati termin", "Validno vrijeme");
   });
   
   it('Decimalna vrijednost kao pola sata', function() {
      let okvir1 = document.createElement("DIV");
      let okvir2 = document.createElement("DIV");
      okvir1.setAttribute("id", "okvir1");
      okvir2.setAttribute("id", "okvir2");   
      Raspored.iscrtajRaspored(okvir1, ['Ponedjeljak', 'Utorak', 'Srijeda', 'Cetvrtak', 'Petak'], 8, 21);
      Raspored.dodajAktivnost(okvir1, 'WT', 'predavanje', 8.5, 12, 'Ponedjeljak');
      let table1 = okvir1.firstChild; 
      let red1 = table1.childNodes[1];
      assert.equal(red1.childNodes[2].innerText, "WT\npredavanje", "Naziv aktivnosti treba biti WT, tip treba biti predavanje");
});
   
   it('Parametar dan mora biti validan', function() {
      let okvir1 = document.createElement("DIV");
      okvir1.setAttribute("id", "okvir1");
      Raspored.iscrtajRaspored(okvir1, ['Ponedjeljak', 'Utorak', 'Srijeda', 'Petak'], 8, 21);
      var x = Raspored.dodajAktivnost(okvir1, 'WT', 'predavanje', 7, 12, 'Cetvrtak');
      assert.equal(x, "Greska - u rasporedu ne postoji dan ili vrijeme u kojem pokusavate dodati termin", "Validan dan");
   });
	 
   it('Rubni slucaj kad je red popunjen', function() {
      let okvir1 = document.createElement("DIV");
      okvir1.setAttribute("id", "okvir1");
      Raspored.iscrtajRaspored(okvir1, ['Ponedjeljak'], 8, 15);
      Raspored.dodajAktivnost(okvir1, 'WT', 'predavanje', 8, 15, 'Ponedjeljak');
      let table1 = okvir1.firstChild;
      let red1 = table1.childNodes[1];
      assert.equal(red1.childNodes[1].innerText, "WT\npredavanje", "Naziv aktivnosti treba biti WT, tip treba biti predavanje");
   });
   
   it('Rubni slucaj kad tabela ima samo jedan dvocas', function() {
      let okvir1 = document.createElement("DIV");
      okvir1.setAttribute("id", "okvir1");
      Raspored.iscrtajRaspored(okvir1, ['Ponedjeljak'], 8, 10);
      Raspored.dodajAktivnost(okvir1, 'WT', 'predavanje', 8, 10, 'Ponedjeljak');
      let table1 = okvir1.firstChild;
      let red1 = table1.childNodes[1];
      assert.equal(red1.childNodes[1].innerText, "WT\npredavanje", "Naziv aktivnosti treba biti WT, tip treba biti predavanje");
   });
   
   it('Tabela maksimalne velicine, puna', function() {
      let okvir1 = document.createElement("DIV");
      okvir1.setAttribute("id", "okvir1");
      Raspored.iscrtajRaspored(okvir1, ['Ponedjeljak', 'Utorak', 'Srijeda', 'Cetvrtak', 'Petak'], 8, 24);
      Raspored.dodajAktivnost(okvir1, 'WT', 'predavanje', 8, 23, 'Ponedjeljak');
      Raspored.dodajAktivnost(okvir1, 'RMA', 'vjezbe', 8, 23, 'Utorak');
      Raspored.dodajAktivnost(okvir1, 'OI', 'tutorijal', 8, 23, 'Srijeda');
      Raspored.dodajAktivnost(okvir1, 'DM', 'predavanje', 8, 23, 'Cetvrtak');
      Raspored.dodajAktivnost(okvir1, 'DM', 'tutorijal', 8, 23, 'Petak');
      let table1 = okvir1.firstChild;
      let red1 = table1.childNodes[1];
      assert.equal(red1.childNodes[1].innerText, "WT\npredavanje", "Naziv aktivnosti treba biti WT, tip treba biti predavanje");
      red1 = table1.childNodes[2];
      assert.equal(red1.childNodes[1].innerText, "RMA\nvjezbe", "Naziv aktivnosti treba biti WT, tip treba biti predavanje");
      red1 = table1.childNodes[3];
      assert.equal(red1.childNodes[1].innerText, "OI\ntutorijal", "Naziv aktivnosti treba biti WT, tip treba biti predavanje");
      red1 = table1.childNodes[4];
      assert.equal(red1.childNodes[1].innerText, "DM\npredavanje", "Naziv aktivnosti treba biti WT, tip treba biti predavanje");
      red1 = table1.childNodes[5];
      assert.equal(red1.childNodes[1].innerText, "DM\ntutorijal", "Naziv aktivnosti treba biti WT, tip treba biti predavanje");
   });

  });

});