window.onload = function() {

  let okvir1 = document.getElementById("okvir1");
  let okvir2 = document.getElementById("okvir2");
  iscrtajRaspored(okvir1, ['Ponedjeljak', 'Utorak', 'Srijeda', 'Cetvrtak', 'Petak'], 8, 21);
  iscrtajRaspored(okvir2, ['Utorak', 'Srijeda', 'Petak'], 6, 17);

  dodajAktivnost(okvir1, 'WT', 'predavanje', 9, 12, 'Ponedjeljak');
  dodajAktivnost(okvir1, 'WT', 'vjezbe', 12, 13.5, 'Ponedjeljak');
  dodajAktivnost(okvir1, 'RMA', 'predavanje', 14, 17, 'Ponedjeljak');
  dodajAktivnost(okvir1, 'RMA', 'vjezbe', 12.5, 14, 'Utorak');
  dodajAktivnost(okvir1, 'DM', 'tutorijal', 14, 16, 'Utorak');
  dodajAktivnost(okvir1, 'DM', 'predavanje', 16, 19, 'Utorak');
  dodajAktivnost(okvir1, 'OI', 'predavanje', 12, 15, 'Srijeda');
  dodajAktivnost(okvir1, 'OI', 'tutorijal', 12, 14.5, 'Cetvrtak');
  dodajAktivnost(okvir1, 'RG', 'predavanje', 14.5, 17.5, 'Cetvrtak');
  dodajAktivnost(okvir1, 'RPR', 'predavanje', 8, 12.5, 'Petak');
  dodajAktivnost(okvir1, 'RPR', 'vjezbe', 19.5, 21, 'Petak');

  dodajAktivnost(okvir2, 'RMA', 'vjezbe', 6, 8.5, 'Utorak');
  dodajAktivnost(okvir2, 'WT', 'predavanje', 8.5, 12, 'Utorak');

  dodajAktivnost(okvir2, 'DM', 'predavanje', 10, 13.5, 'Srijeda');
  //dodajAktivnost(okvir2,'RPR','vjezbe',6.5,10,'Srijeda'); ispraviti
  dodajAktivnost(okvir2, 'OI', 'predavanje', 14, 17, 'Utorak');
  dodajAktivnost(okvir2, 'DM', 'tutorijal', 8.5, 10, 'Petak');
  dodajAktivnost(okvir2, 'RMA', 'predavanje', 12.5, 16.5, 'Petak');
}
