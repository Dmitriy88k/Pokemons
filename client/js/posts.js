const postsContainer = document.getElementById('posts');
const usersContainer = document.getElementById('users');
const searchBtn = document.getElementById('searchBtn');
const idInput = document.getElementById('idInput');


searchBtn.addEventListener('click', function() {
  let idInputNumber = Number(idInput.value);
  console.log(idInputNumber);
})

searchBtn.addEventListener('click', function() {
  fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
  .then(response => response.json())

  setTimeout(() => {
    postsContainer.innerHTML = "";
  }, 1000)
})



function loadPosts() {
  return fetch('https://jsonplaceholder.typicode.com/posts').then(response => 
  response.json())
}

function loadUsers() {
  return fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
}

Promise.all([
  loadPosts(),
  loadUsers()
]).then(([posts, users]) => {


  

  for (let post of posts) { 
    const postContainer = document.createElement('div');

    const title = document.createElement('h3');
    title.innerText = "Title: " + post.title;

    const body = document.createElement('p');
    body.innerText = post.body;


    const userData = users.find(user => user.id === post.userId);
    
    let emailAddress;
    if (userData) {
      emailAddress = document.createElement("p");
      emailAddress.innerText = `Nickname: ${userData.email}`;
    }

    let userName;
    userName = document.createElement("p");
    userName.innerText = `Author: ${userData.name}`;

    const postId = document.createElement('p');
    postId.innerText = "Post #" + post.id;

    const phoneNumber = document.createElement('p');
    phoneNumber.innerText = `Phone# ${userData.phone}`; 

    const line = document.createElement('p');
    line.innerText = "____________________________________";


    postContainer.appendChild(postId);
    postContainer.appendChild(userName);
    postContainer.appendChild(title);
    postContainer.appendChild(body);
    postContainer.appendChild(emailAddress);
    postContainer.appendChild(phoneNumber);
    postContainer.appendChild(line);
    
 
    postsContainer.appendChild(postContainer);

  }
})