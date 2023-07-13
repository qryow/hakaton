//data start 
let users = [
  {
      userName: 'Musi',
      password: '12345678',
      isLogin: false,
      sendMessage: [],
      getMessage: []
  },
  {
      userName: 'Arzymat',
      password: 'iLoveTokmok',
      isLogin: false,
      sendMessage: [],
      getMessage: []
  },
  {
    userName: 'Marzhan',
    password: 'skzWorldDomiantion',
    isLogin: false,
    sendMessage: [],
    getMessage: []
  },
  {
    userName: 'Alihan',
    password: 'Yanegr',
    isLogin: false,
    sendMessage: [],
    getMessage: []
  },
  {
    userName: 'Zhan',
    password: 'justZhan',
    isLogin: false,
    sendMessage: [],
    getMessage: []
  },
  {
    userName: 'Adahan',
    password: 'пароль',
    isLogin: false,
    sendMessage: [],
    getMessage: []
  },
  {
    userName: 'Zhyldyz',
    password: 'women>man',
    isLogin: false,
    sendMessage: [],
    getMessage: []
  },
  {
    userName: 'Akbar',
    password: 'Akashisupertop',
    isLogin: false,
    sendMessage: [],
    getMessage: []
  },
  {
    userName: 'Erlan',
    password: '550442',
    isLogin: false,
    sendMessage: [],
    getMessage: []
  },
  {
    userName: 'Kairat',
    password: 'I am Kira',
    isLogin: false,
    sendMessage: [],
    getMessage: []
  },
  {
    userName: 'Emir',
    password: 'KingEmir',
    isLogin: false,
    sendMessage: [],
    getMessage: []
  }
]

//*REGISTER/LOGIN/LOGOUT logic

let inSystem = '';

function changeInSystemUser(userName='') {  
  inSystem = userName;
  let h3 = document.querySelector('h3');
  inSystem 
  ? 
  h3.innerText = `В системе ${userName}`  
  :
  h3.innerText = 'No users in system';
};

// register
function checkUniqueUserName(userName) {
  return users.some(item => item.userName === userName);
};

function checkPasswords(pass, passConfirm) {
  return pass === passConfirm;
};

function createUser() {
  let userName = prompt('Enter username');
  if(checkUniqueUserName(userName)) {
      alert('User already exists!');
      return;
  };
  let pass = prompt('Enter password');
  let passConfirm = prompt('Enter password confirmation');
  if(!checkPasswords(pass, passConfirm)) {
      alert('Passwords don\'t match!');
      return;
  };
  let userObj = {
      userName: userName,
      password: pass,
      isLogin: false,
      sendMessage: [],
      getMessage: []
  };
  users.push(userObj);
  console.log(users);
  readUserNames();
};
readMessage()
// login
function getUserObj(userName) {
  return users.find(item => item.userName === userName);
};

function checkUserPassword(userName, pass) {
  let user = getUserObj(userName);
  return user.password === pass;
};

function loginUser() {
  let userName = prompt('Enter username');
  if(!checkUniqueUserName(userName)) {
      alert('User not found!');
      return;
  };
  let pass = prompt('Enter password');
  if(!checkUserPassword(userName, pass)) {
      alert('Password doesn\'t match this account!');
      return;
  };
  let user = getUserObj(userName);
  user.isLogin = true;
  changeInSystemUser(userName);
  console.log(users);
};


//! DELETE
function deleteUser() {
  if(!inSystem) {
    alert('Only authorized users can logout!');
    return;
  };
  const deleteUser = confirm('Are you sure you want to delete your user account?');
  if (deleteUser) {
    const checkUser = getUserObj(inSystem);
    users = users.filter(user => user !== checkUser);
    changeInSystemUser();
    alert('User account deleted successfully!');
  }
}


//! SEND MESSAGE
function sendMessage() {
  if(!inSystem) {
    alert('Only authorized users can logout!');
    return;
  };
  let user = prompt('Who do you want to send a message to ?');
  if(!checkUniqueUserName(user)) {
    alert('User not found!');
    return;
  };
  let messageTitle = prompt('Write your message');
  let messageObjSend = {
    id: Date.now(),
    title: messageTitle,
    to: user
  }
  let messageObjGet = {
    id: Date.now(),
    title: messageTitle,
    from: inSystem
  };
  let userGetter = getUserObj(user);
  let userSender = getUserObj(inSystem);
  userSender.sendMessage.push(messageObjSend);
  userGetter.getMessage.push(messageObjGet)
  readMessage()
  readIds()
}


////! DELETE MESSAGES 
function deleteMessage() {
  if (!inSystem) {
    alert('Only authorized users can delete message!');
    return;
  }
  let messageId = +prompt('Enter post id');
  let user = getUserObj(inSystem);

  let checkSendId = user.sendMessage.some(message => message.id === messageId);
    if (checkSendId) {
      user.sendMessage = user.sendMessage.filter(message => message.id !== messageId);
      alert('Send message deleted!');
    } else if (!checkSendId) {
      alert('There is no message with this id or you are not the author of such a message!');
    }
    console.log(users);
    readMessage();
    readIds()
}


//! READ LIST
//! READ MESSAGE
function readMessage() {
  let list = document.querySelector('.messages');
  list.innerHTML = '';
  for (let user of users) {
    for (let message of user.sendMessage) {
      list.innerHTML += `<li>${user.userName} send: [ ${message.title} ] 
      to : ${message.to}</li>`;
    }
  }
  deleteUser()
}
readMessage();


//! READ NAMES 
function readUserNames() {
  let list = document.querySelector('.names');
  list.innerHTML = '';
  for(let i of users) {
      list.innerHTML += `<li>${i.userName} ___ Password: ${i.password}</li>`;
  };
};
readUserNames();


//! READ IDS
function readIds() {
  let list = document.querySelector('.ids');
  list.innerHTML = '';
  for (let user of users) {
    for (let message of user.sendMessage) {
      list.innerHTML += `<li>message:[ ${message.title}]; id:${message.id}</li>`;
    }
  }
}
readIds();
deleteUser()