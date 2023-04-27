// get user id
const urlRaw = window.location.href;
const url = new URL(urlRaw);
const userId = url.searchParams.get('id');
//

const posts_URL = `https://gorest.co.in/public/v2/users/${userId}/posts`;

const postsContainer = document.getElementById('list-group');

// Create post card
function createPost(post) {
  console.log(post);

  const postCard = document.createElement('li');
  postCard.classList.add(
    'list-group-item',
    'd-flex',
    'justify-content-between',
    'align-items-start'
  );

  const textContainer = document.createElement('div');
  textContainer.classList.add('ms-2', 'me-auto');
  textContainer.innerText = post.body.slice(0, 100) + '...';

  const postUserLink = document.createElement('a');
  postUserLink.setAttribute('href', `./post.html?id=${post.id}`);
  postUserLink.classList.add('fw-bold');

  const postUserName = document.createElement('h5');
  postUserName.classList.add('fw-bold');
  postUserName.innerText = post.title;

  // append all el to postCard

  postUserLink.appendChild(postUserName);
  textContainer.prepend(postUserLink);

  postCard.appendChild(textContainer);

  return postCard;
}
//

//get posts of user
function getPosts() {
  return fetch(posts_URL)
    .then((Response) => {
      if (!Response.ok) {
        throw new Error('Помилка завантаження');
      }

      return Response.json();
      //   return (data = []);
    })

    .then((data) => {
      if (!data.length) {
        const errorMessageBox = createMessageBox(
          'У цього користувача поки що немає постів.. :('
        );
        postsContainer.appendChild(errorMessageBox, `success`);
        backLink();

        return;
      }
      backLink();

      data.forEach((user) => {
        const card = createPost(user);
        postsContainer.appendChild(card);
      });
    })

    .catch((error) => {
      const errorMessageBox = createMessageBox(error.message, 'danger');
      postsContainer.appendChild(errorMessageBox, `error`);
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
  postsContainer.appendChild(backLink);
}
//

getPosts();
