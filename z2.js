const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('public/public-html-css'));

//app.use(express.static('public/public-javascript'));



app.get('/predmeti', function(req, res) {

  fs.readFile('predmeti.txt', function(err, data) {
    if (err) res.send("Greska");

    else {

      let predmeti = [];
      let tekst = data.toString('utf-8');
      let redovi = tekst.split("\n");

      for (var i = 0; i < redovi.lenght; i++) {
        if (redovi[i] != "") predmeti.push({
          naziv: redovi[i]
        });


      }
      res.json(predmeti);


    }



  });
});

app.get('/aktivnosti', function (req, res) {
    fs.readFile('aktivnosti.txt', function (err, data) {
        if (err) {res.send("Greska");
		return;
        }

        let podaci = data.toString('utf-8');
        let aktivnosti = podaci.split('\n');

        aktivnosti[aktivnosti.length - 1] == '' ? aktivnosti.pop() : null;

        aktivnosti.forEach((niz, i) => {
            niz = niz.split(',');

            aktivnosti[i] = {
                naziv: niz[0],
                tip: niz[1],
                pocetak: parseFloat(niz[2]),
                kraj: parseFloat(niz[3]),
                dan: niz[4]
            }
        });

        res.json(aktivnosti);
    });
});

app.get('/predmet/:naziv/aktivnost', function (req, res) {
    
    let predmet = req.params.naziv;

    fs.readFile('aktivnosti.txt', function (err, data) {
        if (err){res.send("Greska");
		return;
        }

	let aktZaPred = [];
        let podaci = data.toString('utf-8');
        let aktivnosti = podaci.split('\n');
        

        aktivnosti[aktivnosti.length - 1] == '' ? aktivnosti.pop() : null;

        aktivnosti.forEach((niz) => {
            niz = niz.split(',');

            if (niz[0].toLowerCase() == predmet.toLowerCase()) {
                aktZaPred.push({
                    naziv: niz[0],
                    tip: niz[1],
                    pocetak: parseFloat(niz[2]),
                    kraj: parseFloat(niz[3]),
                    dan: niz[4]
                });
            }
        });

        if (aktZaPred.length == 0) res.json({ message: "Ne postoje aktivnosti za traženi predmet!" });
        else res.json(aktZaPred);
    });
});


app.post('/predmet', function(req, res) {

  let tijeloZahtjeva = req.body;



  fs.readFile('predmeti.txt', function(err, data) {



    let podaci = data.toString('utf-8');
    let predmeti = podaci.split('\n');
    predmeti[predmeti.length - 1] == '' ? predmeti.pop() : null;

    if (predmeti.includes(tijeloZahtjeva.naziv)) {
      res.json({
        message: "Naziv predmeta postoji!"
      });
      return;
    }

    fs.appendFile('predmeti.txt', tijeloZahtjeva.naziv +'\n', function(err) {
      if (err) throw err;
      res.json({
        message: "Uspješno dodan predmet!",
        data: tijeloZahtjeva.naziv
      });
    });
  });
});

app.post('/aktivnost', function (req, res) {
    let tijeloZahtjeva = req.body;

    if(tijeloZahtjeva['dan'] == undefined || tijeloZahtjeva['naziv'] == undefined || tijeloZahtjeva['tip'] == undefined || tijeloZahtjeva['pocetak'] == undefined || tijeloZahtjeva['kraj'] == undefined) { res.send("Aktivnost nije validna!"); return; }
    
    let novaAktivnost = tijeloZahtjeva['naziv'] + ',' + tijeloZahtjeva['tip'] + ',' + tijeloZahtjeva['pocetak'] + ',' + tijeloZahtjeva['kraj'] + ',' + tijeloZahtjeva['dan'];

    
    fs.readFile('aktivnosti.txt', function (err, data) {
        if (!err) {
            let podaci = data.toString('utf-8');
            let aktivnosti = podaci.split('\n');

            aktivnosti[aktivnosti.length - 1] == '' ? aktivnosti.pop() : null;

            if (aktivnosti.includes(novaAktivnost)) {
                res.json({ message: "Aktivnost vec postoji!" });
                return;
            }
        }
        else if(err) { res.send("Aktivnost nije validna!"); return; }



        fs.appendFile('aktivnosti.txt', novaAktivnost + '\n', function (err) {
            if (err) res.send("Greska");

            res.json({ message: "Uspješno dodana aktivnost!" });
        });
    });
});

app.delete('/all', function (req, res) {
    if (!fs.existsSync('predmeti.txt') || !fs.existsSync('aktivnosti.txt')) {
        res.json({ message: "Greška - sadržaj datoteka nije moguce obrisati!" });
        return;
    }

    fs.writeFile('predmeti.txt', '', function (err) {
        if (err) res.json({ message: "Greška - sadržaj datoteka nije moguce obrisati!" });

        fs.writeFile('aktivnosti.txt', '', function (err) {
            if (err) res.json({ message: "Greška - sadržaj datoteka nije moguce obrisati!" });

            res.json({ message: "Uspješno obrisan sadržaj datoteka!" });
        });
    });
});
app.delete('/aktivnost/:naziv', function (req, res) {
    let naziv = req.params.naziv;
    let redovi = [];

    fs.readFile('aktivnosti.txt', 'utf8', function (err, data) {
        if (err) {
            res.json({ message: "Greška - aktivnost nije obrisana!" });
            return;
        }

        let podaci = data.toString('utf-8');
        let aktivnosti = podaci.split('\n');

        for (let i = 0; i < aktivnosti.length; i++) {
            let a = aktivnosti[i].split(',');

            if (a[0].toLowerCase() == naziv.toLowerCase()) redovi.push(i);
        }

        if (redovi.length == 0) {
            res.json({ message: "Greška - aktivnost nije obrisana!" });
            return;
        }

        let noviPodaci = data.split('\n').filter((p, i) => redovi.indexOf(i) === -1).join('\n');

        fs.writeFile('aktivnosti.txt', noviPodaci, 'utf8', function (err) {
            if (err) res.json({ message: "Greška - aktivnost nije obrisana!" });

            res.json({ message: "Uspješno obrisana aktivnost!" });
        });
    })
});

app.delete('/predmet/:naziv', function (req, res) {
    let naziv = req.params.naziv;
    let redovi = [];

    fs.readFile('predmeti.txt', 'utf8', function (err, data) {
        if (err) {
            res.json({ message: "Greška - predmet nije obrisan!" });
            return;
        }

        let podaci = data.toString('utf-8');
        let predmeti = podaci.split('\n');

        predmeti[predmeti.length - 1] == '' ? predmeti.pop() : null;

        for (let i = 0; i < predmeti.length; i++) {
            let p = predmeti[i].split(',');

            if (p[0].toLowerCase() == naziv.toLowerCase()) redovi.push(i);
        }

        if (redovi.length == 0) {
            res.json({ message: "Greška - predmet nije obrisan!" });
            return;
        }

        let noviPodaci = data.split('\n').filter((p, i) => redovi.indexOf(i) === -1).join('\n');

        fs.writeFile('predmeti.txt', noviPodaci, 'utf8', function (err) {
            if (err) res.json({ message: "Greška - predmet nije obrisan!" });

            res.json({ message: "Uspješno obrisan predmet!" });
        });
    });
});


module.exports = app;


app.listen(3000);
