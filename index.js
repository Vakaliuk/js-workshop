const API_URL = 'https://gorest.co.in/public/v2/users';

const userContainer = document.getElementById('list-group');

function createUser(user) {
  const card = document.createElement('a');
  card.classList.add('list-group-item', 'list-group-item-action');
  card.setAttribute('aria-current', 'true');

  // card title group
  const cardNameBody = document.createElement('div');
  cardNameBody.classList.add('d-flex', 'w-100', 'justify-content-between');

  const cardNameLink = document.createElement('a');
  cardNameLink.setAttribute('href', `/public/v2/users/${user.id}/posts`);
  cardNameLink.classList.add('mb-1');

  const cardName = document.createElement('h5');
  cardName.classList.add('mb-1');
  cardName.innerText = user.name;

  const active = document.createElement('small');
  active.innerText = user.status;
  //

  const userMail = document.createElement('p');
  userMail.classList.add('mb-1');
  userMail.innerText = user.email;

  const gender = document.createElement('small');
  gender.innerText = user.gender;

  // append all el to userCard
  cardNameLink.appendChild(cardName);
  cardNameBody.appendChild(active);
  cardNameBody.insertBefore(cardNameLink, active);

  card.appendChild(cardNameBody);
  card.appendChild(userMail);
  card.appendChild(gender);

  return card;
}

function getUsers() {
  return fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((user) => {
        const card = createUser(user);
        userContainer.appendChild(card);
      });
    });
}

getUsers();
