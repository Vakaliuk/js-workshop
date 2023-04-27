// get post id
const urlRaw = window.location.href;
const url = new URL(urlRaw);
const postId = url.searchParams.get('id');

const post_URL = `https://gorest.co.in/public/v2/posts/${postId}`;
console.log(post_URL);
//

const container = document.querySelector('.container');

//create Post
function doPost(post) {
  const postContainer = document.createElement('div');

  const postTitle = document.createElement('h4');
  postTitle.innerText = post.title;

  const postBody = document.createElement('p');
  postBody.innerText = post.body;

  postContainer.appendChild(postTitle);
  postContainer.appendChild(postBody);

  return postContainer;
}
//

//get current post
function getPost() {
  return fetch(post_URL)
    .then((Response) => {
      if (!Response.ok) {
        throw new Error('Помилка завантаження');
      }

      return Response.json();
      //   return (data = []);
    })

    .then((data) => {
      const post = doPost(data);
      container.appendChild(post);
      backLink();
    })

    .catch((error) => {
      const errorMessageBox = createMessageBox(error.message, 'danger');
      container.appendChild(errorMessageBox, `error`);
    });
}
//

//Error message
function createMessageBox(message, type = 'success') {
  const cl = `alert-${type}`;
  const errorMessageBox = document.createElement('div');
  errorMessageBox.classList.add('alert', cl);
  errorMessageBox.innerText = message;

  return errorMessageBox;
}
//

//link for back
function backLink() {
  const backLink = document.createElement('a');
  backLink.setAttribute('href', `./main-users.html`);
  backLink.classList.add('fw-bold');
  backLink.innerText = 'Назад';
  container.appendChild(backLink);
}
//

getPost();
