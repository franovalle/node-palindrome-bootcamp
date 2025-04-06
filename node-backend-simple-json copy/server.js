const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet');
const { log } = require('console');

const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }

  else if (page == '/api') {
  const palindrome = params['word']
  console.log(palindrome)
  const palindromeAgain = Array.from(palindrome).reverse().join("")
  console.log(palindromeAgain)
  
 
 
    if('word' in params){
      console.log(palindrome, palindromeAgain)
      if(palindrome== palindromeAgain){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          result: palindromeAgain,
          display: "This word is a palindrome"
        }
        res.end(JSON.stringify(objToJson));
      }
      else if(palindrome != palindromeAgain){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          result: palindromeAgain,
          display: "This word is NOT a palindrome",
        }
        res.end(JSON.stringify(objToJson));
      }
    }
  }
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
//notes to self:
 /* notes for guidance:  else if (page == '/api') {
    const coinToss = Math.floor(Math.random() * 2)
    console.log(coinToss)
    if ('choice' in params) {
      console.log(params['choice'], coinToss)
      if (params['choice'] == coinToss) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const objToJson = {
          display: "You Win!",
          results: coinToss,

        }
        res.end(JSON.stringify(objToJson));
      }
  */
 //pseudo code: i want to say if the input is reversed & are = say palindrome 
 //mdn notes on reverse
 //const items = [1, 2, 3];
//console.log(items); // [1, 2, 3]

//items.reverse();
//console.log(items); // [3, 2, 1]