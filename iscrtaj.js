function iscrtajRaspored(div, dani, satPocetak, satKraj) {

    if (satPocetak >= satKraj || satPocetak != parseInt(satPocetak) || satKraj != parseInt(satKraj) || satPocetak < 0 || satPocetak > 24 || satKraj < 0 || satKraj > 24) {
      document.write("Greska");
      
    }
    var i;
    var j;


    var im = 'tabela' + String(div.getAttribute("id"));



    var a = document.createElement("table");
    a.setAttribute("id", im);
    //a.setAttribute("class",div.getAttribute("id"));
    div.appendChild(a);

    //alert(a.getAttribute("id"));
    //div.setAttribute("class",div.getAttribute("id"));
    //var t;

    for (i = 0; i < dani.length + 1; i++) {

      var x = document.createElement("TR");

      var tt = String(i) + im;
      // alert(tt);

      x.setAttribute("id", tt);

      //alert(im);

      //		alert(document.getElementById(im));

      a.appendChild(x);



      var t;
      for (j = 0; j < (satKraj - satPocetak) * 2 + 1; j++) {
        var y = document.createElement("TD");



        if (j == 0) {
          y.setAttribute("class", "g");

          if (i == 0) {
            y.setAttribute("class", "f");
            var t = document.createTextNode("");
          }

          //var y = document.createElement("TH");
          else var t = document.createTextNode(dani[i - 1]);


        } else {
          if (i == 0) {
            y.setAttribute("class", "f");
            y.setAttribute("colspan", "2");
            //  if(j==1 || j==3) 
            if (satPocetak + j - 1 < satKraj + 1 && (satPocetak + j - 1 == 0 || satPocetak + j - 1 == 2 || satPocetak +

                j - 1 == 4 || satPocetak + j - 1 == 6 ||
                satPocetak + j - 1 == 8 || satPocetak + j - 1 == 10 || satPocetak + j - 1 == 12 ||
                satPocetak + j - 1 == 15 || satPocetak + j - 1 == 17 || satPocetak + j - 1 == 19 ||
                satPocetak + j - 1 == 21 || satPocetak + j - 1 == 23)) {
              var t = document.createTextNode(satPocetak + j - 1 + ":00");


              var x = "0" + String(satPocetak + j - 1);
              if (satPocetak + j - 1 < 10) {
                var t = document.createTextNode(x + ":00");
              }

            }

            //0,2,4,6,8,10,12,15,17,19,21,23
            else var t = document.createTextNode("");
          } else {
            // var y = document.createElement("TD");
            if (j % 2 == 0) y.setAttribute("class", "b")
            else y.setAttribute("class", "c");
            var t = document.createTextNode("\xa0\xa0\xa0\xa0\xa0");
          }

        }
        y.appendChild(t);

        a.childNodes[i].appendChild(y);
      }
    }

    //return div;
  }


function dodajAktivnost(raspored, naziv, tip, vrijemePocetak, vrijemeKraj, dan) {

if (raspored == null) {
      alert("Greska - raspored nije kreiran");
      return;
      

    }


    if (vrijemePocetak >= vrijemeKraj) {
       alert("Greska - vec postoji termin u rasporedu u zadanom vremenu");
       return;
      

    }
    //	raspored.innerHTML = dan;	

    var im = 'tabela' + String(raspored.getAttribute("id"));

    //alert(raspored.getAttribute("id"));

    //var tab = document.getElementById(im);
		var tab = raspored.childNodes[1];
    
   // alert(raspored.childNodes[0]);
  
  //   alert(tab.childNodes[1].innerText);
    //alert(tab.childNodes[1].innerText);
    
    if (raspored.childNodes[0] == null) {
      alert("Greska - raspored nije kreiran");
      return;
      

    }
    
   
    
    var h=0;
    
    for(var i=1; i<tab.childElementCount; i++) {
    var splitString = String(tab.childNodes[i].innerText).split("");
  //  alert(splitString[0]);
   //alert(String(tab.childNodes[i].innerText));alert(String(dan));
    	if(dan[0] == splitString[0])h=1;
    }
    
   // if(ho==0)return ("Greska - u rasporedu ne postoji dan ili vrijeme u kojem pokusavate dodati termin");
    
    

    var sati = tab.childNodes[0];

    var pocetni = sati.childNodes[1];

    var krajnji = sati.lastChild.previousSibling;

    var zadnjiRed = tab.lastChild;


    var s1 = String(pocetni.innerHTML);

    // alert(pocetni.innerHTML);

    var s1 = parseInt(s1, 10);

    var last = sati.lastChild;

    var p = last.previousSibling;
    var q = p;
    while (1) {
      if (p.innerHTML != "") break;

      p = p.previousSibling;
      q.remove();
      q = p;
    }

    var s2 = String(p.innerHTML);

    var s2 = parseInt(s2, 10);

    if (h==0 || vrijemePocetak < s1 || vrijemePocetak > s2 || vrijemeKraj < s1 || vrijemeKraj > s2) {
       alert("Greska - u rasporedu ne postoji dan ili vrijeme u kojem pokusavate dodati termin");
       return;
      

    }
    //cell1.innerHTML = s2;

    var i = 0;
    var r = tab.firstChild;
    while (r <= tab.lastChild) {
      i++;
      var r = tab.childNodes[i];
      if (r.firstChild.innerHTML == dan) break;

    }

    var polje = r.childNodes[1];
    var poc = r.childNodes[1];
    var kr = r.childNodes[1];

    var l = 1;


    for (i = s1; i < s2; i = i + 0.5) {

      l++;


      if (polje.getAttribute("colspan") > 0) {
        //continue;

        i = i + polje.getAttribute("colspan") / 2 - 0.5;
        if ((i <= vrijemeKraj && i >= vrijemePocetak) || vrijemePocetak >= vrijemeKraj) {
          alert("Greska - vec postoji termin u rasporedu u zadanom vremenu");
          return;
         

        }

      } else {


        if (i == vrijemePocetak) {
          polje.setAttribute("class", "n");
          polje.innerHTML = 'x';
          poc = polje;
        }


        if (i + 0.5 == vrijemeKraj) {
          polje.setAttribute("class", "n");
          //polje.innerHTML='x';
          kr = polje;
        }
      }

      polje = r.childNodes[l];


    }


    polje = kr;
    while (kr != poc) {
      kr = kr.previousSibling;
      polje.remove();
      polje = kr;
    }

    poc.setAttribute("colspan", (vrijemeKraj - vrijemePocetak) * 2);
    poc.innerText = String(naziv + '\n' + tip);
    //poc.innerText = String(s1 + '\n' + s2);

    if (vrijemePocetak % 2 == 0 && vrijemeKraj % 2 == 0) poc.setAttribute("style", "border-style: solid solid solid solid;");
    else if (vrijemePocetak % 2 == 0 && vrijemeKraj % 2 != 0) poc.setAttribute("style", "border-style: solid dashed solid solid;");
    else if (vrijemePocetak % 2 != 0 && vrijemeKraj % 2 == 0) poc.setAttribute("style", "border-style: solid solid solid dashed;");
    else if (vrijemePocetak % 2 != 0 && vrijemeKraj % 2 != 0) poc.setAttribute("style", "border-style: solid dashed solid dashed;");


    if (s1 == vrijemePocetak && s2 != vrijemeKraj) poc.setAttribute("style", "border-style: solid none solid solid;");
    else if (s1 != vrijemePocetak && s2 == vrijemeKraj) poc.setAttribute("style", "border-style: solid solid solid none;");
    else if (s1 == vrijemePocetak && s2 == vrijemeKraj) poc.setAttribute("style", "border-style: solid solid solid solid;");
	

  }