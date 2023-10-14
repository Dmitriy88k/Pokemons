//получить id post из url

const splittedHref = location.href.split('/');
const name = splittedHref[splittedHref.length - 1];

console.log(name);
//сделать запрос на https://jsonplaceholder.typicode.com/posts/${post.id} с id текущего поста
//отобразить на странице