import avatar from '../images/avatar.jpg';
import projectLogo from '../images/logo.svg';

export const loadImages = () => {
  const headerLogo = document.querySelector('.header__logo');
  headerLogo.setAttribute('src', projectLogo);

  const profileImage = document.querySelector('.profile__image');
  profileImage.style.backgroundImage = `url(${avatar})`;
};
