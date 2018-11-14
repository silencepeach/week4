const http = require('http');

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}
${Object.keys(req.headers).map(k => `${k}: ${req.headers[k]}`).join('\n')}
`);

  req.on('data', d => console.log(d.toString()));

  try {
    if (req.method.toUpperCase() === 'GET') {
      switch (req.url) {
        case '/':
          main(res);
          break;
        case '/board':
          board(res);
          break;
        default:
          throw new Error('404 Not found');
      }
    } else if (req.method.toUpperCase() === 'POST') {
      switch (req.url) {
        case '/board':
          board_write(res);
          break;
        default:
          throw new Error('404 Not found');
      }
    } else {
      throw new Error('404 Not found');
    }

  } catch (e) {
    res.statusCode = 404;
    res.write(e.message);
    res.end();
  }
});

server.listen('3000', '0.0.0.0', () => {
  console.log('server online');
});

function main(res) {
  res.write('This is main page.');
  res.end();
}

function board(res) {
  res.write('This is board page.');
  res.end();
}

function board_write(res) {
  res.write('This is board write page.');
  res.end();
}