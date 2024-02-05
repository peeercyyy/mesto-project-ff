const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
  headers: {
    Authorization: '142b5026-8b20-4ccf-a97a-8d55a6719c50',
  },
};

const handleFetch = (url, { method, data } = { method: 'GET', data: null }) => {
  const header =
    method === 'POST' || method === 'PATCH'
      ? { 'Content-Type': 'application/json' }
      : {};
  const headers = { ...config.headers, ...header };
  return fetch(`${config.baseUrl}${url}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  })
    .then(getResData)
    .catch(console.log);
};

const getResData = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export const getUserData = () => handleFetch('/users/me');

export const getCardList = () => handleFetch('/cards');

export const addCard = ({ name, link }) =>
  handleFetch('/cards', { method: 'POST', data: { name, link } });

export const deleteCard = (cardID) =>
  handleFetch(`/cards/${cardID}`, { method: 'DELETE' });

export const editProfile = ({ name, about }) =>
  handleFetch('/users/me', { method: 'PATCH', data: { name, about } });

export const toggleLike = (cardID, like = false) =>
  handleFetch(`/cards/likes/${cardID}`, { method: like ? 'PUT' : 'DELETE' });

export const updateProfilePic = (avatar) =>
  handleFetch('/users/me/avatar', { method: 'PATCH', data: { avatar } });
