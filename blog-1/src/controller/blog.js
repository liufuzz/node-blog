const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: 1556883362702,
      author: 'zhangsan'
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      createTime: 1556883414938,
      author: 'lisi'
    }
  ];
};

const getDetail = id => {
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: 1556883362702,
    author: 'zhangsan'
  };
};

const newBlog = (blogData = {}) => {
  // ...
  console.log(blogData);
  return {
    id: 3
  };
};

const updateBlog = (id, blogData = {}) => {
  // ...
  console.log(id, blogData);
  return true;
};

const delBlog = id => {
  // ...
  return true;
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
};
