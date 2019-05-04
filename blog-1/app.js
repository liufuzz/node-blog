const queryString = require('querystring');
const handelBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const getPostData = req => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});
      return;
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({});
      return;
    }
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
  return promise;
};

const serverHandle = (req, res) => {
  //设置返回格式JSON
  res.setHeader('content-type', 'application/json');

  req.path = req.url.split('?')[0];

  //解析query
  req.query = queryString.parse(req.url.split('?')[1]);

  //处理post data
  getPostData(req).then(postData => {
    req.body = postData;

    //处理blog路由
    const blogData = handelBlogRouter(req, res);
    if (blogData) {
      res.end(JSON.stringify(blogData));
      return;
    }

    //处理user路由
    const userData = handleUserRouter(req, res);
    if (userData) {
      res.end(JSON.stringify(userData));
      return;
    }

    //未命中路由， 返回404
    res.writeHead(404, { 'Content-type': 'text/plain' });
    res.write('404 Not Found\n');
    res.end();
  });
};

module.exports = serverHandle;
