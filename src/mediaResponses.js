const fs = require('fs'); // pull in the file system module
const path = require('path'); // node's path utilities will allow file object creation

// helper function for loading files
const loadFile = (request, response, filePath, type) => {
  // create file object from directory, file
  const file = path.resolve(__dirname, filePath);

  // get file statistics and handle errors in callback
  fs.stat(file, (err, stats) => {
    // handle errors loading file
    if (err) {
      if (err.code === 'ENOENT') {
        response.writeHead(404);
      }
      return response.end(err);
    }

    // handle requested range of file bytes
    let range = request.headers.range;

    // if not requested, set default
    if (!range) {
      range = 'bytes=0-';
    }

    const positions = range.replace(/bytes=/, '').split('-'); // split relevant info

    let start = parseInt(positions[0], 10); // set start position base 10
    const total = stats.size; // get total file size
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1; // set end position

    // reset start if greater than end
    if (start > end) {
      start = end - 1;
    }

    // calculate size of response
    const chunksize = (end - start) + 1;

    // create appropriate response headers
    response.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`, // range out of total
      'Accept-Ranges': 'bytes', // type of data to expect
      'Content-Length': chunksize, // range size
      'Content-Type': type, // encoding for reassembly
    });

    const stream = fs.createReadStream(file, { start, end });

    stream.on('open', () => {
      stream.pipe(response);
    });

    stream.on('error', (streamErr) => {
      response.end(streamErr);
    });

    return stream;
  });
};

// Get Party video file to stream
const getParty = (request, response) => {
  loadFile(request, response, '../client/party.mp4', 'video/mp4');
};

// Get Bling audio file to stream
const getBling = (request, response) => {
  loadFile(request, response, '../client/bling.mp3', 'audio/mpeg');
};

// Get Bird video file to stream
const getBird = (request, response) => {
  loadFile(request, response, '../client/bird.mp4', 'video/mp4');
};

// exports
module.exports.getParty = getParty;
module.exports.getBling = getBling;
module.exports.getBird = getBird;
