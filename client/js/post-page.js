const container = document.getElementById('container');

//получить id post из url
const splittedHref = location.href.split('/');
const post = splittedHref[splittedHref.length - 1];
console.log("post is", post);

//сделать запрос на https://jsonplaceholder.typicode.com/posts/${post.id} с id текущего поста
const fetchDetails = () => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${post}`).then(res => 
    res.json()
  );
};


//отобразить на странице
fetchDetails().then(details => {
  const title = document.createElement('h3');
  title.innerText = `Title: ${details.title}`;
  title.style.color="white";

  const userId = document.createElement("p");
  userId.innerText = `Post# ${details.id}`;
  userId.style.color="red";
  
  container.appendChild(title);
  container.appendChild(userId);

});
