// get post id
const urlRaw = window.location.href;
const url = new URL(urlRaw);
const postId = url.searchParams.get('id');

const post_URL = `https://gorest.co.in/public/v2/posts/${postId}`;
console.log(post_URL);
//

const container = document.querySelector('.container');

const postPageTitle = document.createElement('h4');
postPageTitle.innerText = `Post #${postId}`;
postPageTitle.classList.add('post-page-title');
container.appendChild(postPageTitle);
//create Post
function doPost(post) {
  const postContainer = document.createElement('div');
  postContainer.classList.add('postContainer');

  const postTitle = document.createElement('h4');
  postTitle.innerText = post.title;
  postTitle.classList.add('title-accent');

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
  const preURL = document.referrer;
  const url = new URL(preURL);
  const preId = url.searchParams.get('id');
  const backLinkURL = `./user-posts.html?id=${preId}`;

  const backLink = document.createElement('a');
  backLink.setAttribute('href', backLinkURL);
  backLink.classList.add('fw-bold', 'backlink');
  backLink.innerText = '< back';
  container.appendChild(backLink);
}
//

getPost();

// posts comments
const comm_Url = `https://gorest.co.in/public/v2/posts/${postId}/comments`;

// //create comm
function createComment(comment) {
  const comm = document.createElement('div');
  comm.classList.add('list-group-item');
  comm.setAttribute('aria-current', 'true');

  // card title group
  const commNameBody = document.createElement('div');
  commNameBody.classList.add('d-flex', 'w-100', 'justify-content-between');

  const commName = document.createElement('h6');
  commName.classList.add('mb-1', 'title-accent');
  commName.innerText = comment.name;
  //

  const userMail = document.createElement('p');
  userMail.classList.add('mb-1');
  userMail.innerText = comment.body;

  const commEmail = document.createElement('small');
  commEmail.innerText = comment.email;
  commEmail.classList.add('email');

  // append all el to userCard
  commNameBody.appendChild(commName);

  comm.appendChild(commNameBody);
  comm.appendChild(userMail);
  comm.appendChild(commEmail);

  return comm;
}

//show comms
function getComms() {
  const commContainer = document.querySelector('.list-group');
  const commsTitle = document.createElement('h6');

  return fetch(comm_Url)
    .then((Response) => {
      if (!Response.ok) {
        throw new Error('Loading error');
      }

      return Response.json();
      //   return (data = []);
    })

    .then((data) => {
      if (!data.length) {
        const errorMessageBox = createMessageBox(
          'no one has left a comment yet'
        );
        commContainer.appendChild(errorMessageBox, `success`);
      }

      data.forEach((user) => {
        const comm = createComment(user);
        commContainer.appendChild(comm);
      });
      commsTitle.innerText = 'comments';
      commContainer.prepend(commsTitle);
    })

    .catch((error) => {
      const errorMessageBox = createMessageBox(error.message, 'danger');
      commContainer.appendChild(errorMessageBox, `error`);
    });
}

getComms();
