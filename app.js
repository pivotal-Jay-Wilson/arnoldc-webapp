
const express = require('express');
const exec = require('child_process').exec;
const app = express();
const fs = require('fs');
const path = require('path');
const port = 8080;

app.get('/', (req, res) => {
  const files =  fs.readdirSync(".");
  let functions = [];
  for (const file of files) {
    if (path.extname(file) === '.class'){
      functions.push( file.replace(".class", "")  );
    }
  }
  res.send(functions);
});

app.get('/run/:class', (req, res) => {
  const child = exec(`java ${req.params.class}`,
   (error, stdout, stderr) => {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    res.send(stdout);      
    if(error !== null){
      console.log('exec error: ' + error);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})