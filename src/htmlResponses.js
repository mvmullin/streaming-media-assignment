// pull in the file system module
const fs = require('fs');

// read files in synchronously with fs (__dirname is a node global for the current directory)
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const page2 = fs.readFileSync(`${__dirname}/../client/client2.html`);
const page3 = fs.readFileSync(`${__dirname}/../client/client3.html`);

// function to send client.html to the client
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' }); // status code and headers to send
  response.write(index); // client.html content to send
  response.end(); // send response
};

// function to send client.html to the client
const getPage2 = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' }); // status code and headers to send
  response.write(page2); // client.html content to send
  response.end(); // send response
};

// function to send client.html to the client
const getPage3 = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' }); // status code and headers to send
  response.write(page3); // client.html content to send
  response.end(); // send response
};

// add functions to Node's export module to make public
module.exports.getIndex = getIndex;
module.exports.getPage2 = getPage2;
module.exports.getPage3 = getPage3;
