const app = require("../z2");
const chai = require("chai");
const chaiHttp = require("chai-http");

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const readline = require('readline');

/*const readInterface = readline.createInterface({
    input: fs.createReadStream('testniPodaci.txt'),
   
});*/


/*readInterface.on('line', function(line) {
    console.log(line.split(',')[0]);
});*/

const { expect } = chai;
chai.use(chaiHttp);
describe("Server!", () => {





  
  



it("test1", done => {

let akt = [];


fs.readFile('testniPodaci.txt', function (err, data) {
	let podaci = data.toString('utf-8');
        let aktivnosti = podaci.split('\n');


	aktivnosti.forEach((a) => {
            a = a.split(',');

           
                    akt.push({
                    op: a[0],
                    route: a[1],
                    naziv: a[2],
                    msg: a[3]
                   
                });

		//akt[0] = "naziv";
            
        });




	console.log(akt[0].naziv);

	for(var i=0; i<akt.length; i++) {
		//console.log(akt[i]);
	}
//if(akt[0].op=='POST')console.log(akt[0]);

 //if(akt[0].op == "POST")console.log(akt[0].op);

    if(akt[0].op == 'POST') {


	naz = akt[0].naziv.split('\n');

    chai
      .request(app)
      .post("/predmet")
      .send({ naziv : "WT" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals("Uspješno dodan predmet!");
        expect(res.body.data).to.equals("WT");
        done();
      });


	}

  });
  
 



 });

  



  
 

  
  
});
