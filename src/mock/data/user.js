import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: 'Mcqueen'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

const Blogs = [
    {
      id: 0,
        title: '安卓开发基础',
        detail: '安卓常用开发基础详解',
        imgUrl: '',
        author: '韦德',
        publishState: 0,
        insertTime: new Date(),
    },
    {
        id: 1,
        title: 'recyclerview的基本使用',
        detail: 'recyclerview去掉listview',
        imgUrl: '',
        author: 'john',
        publishState: 1,
        insertTime: new Date(),
    },
    {
        id: 2,
        title: '理解 JavaScript 的 async/await',
        detail: '一般来说，都认为 await 是在等待',
        imgUrl: '',
        author: 'lily',
        publishState: 0,
        insertTime: new Date(),
    },
    {
        id: 3,
        title: 'vue开发入门',
        detail: 'vue入门详解',
        imgUrl: '',
        author: 'mike',
        publishState: 0,
        insertTime: new Date(),
    }
];

export { LoginUsers, Users, Blogs };
