#!/Users/johnwilson/.nvm/versions/node/v16.13.1/bin/node
const express = require('express');
const exec = require('child_process').exec;
const app = express();
const port = 3000

app.get('/', (req, res) => {
  
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