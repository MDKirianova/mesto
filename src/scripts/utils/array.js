import larnaka from '/src/images/larnaka_image.png';
import limassol from '/src/images/limassol_image.png';
import nikosia from '/src/images/nikosia_image.png';
import paphos from '/src/images/paphos_image.png';
import kurion from '/src/images/kurion_image.png';
import church from '/src/images/ortodox_church_image.png'



const initialCards = [
  {
    name: 'Ларнака',
    link: larnaka,
    description: 'Фото собора св. Лазаря в Ларнаке',
    likeDescription: 'Кнопка для лайка карточки Ларнака'
  },
  {
    name: 'Лимассол',
    link: limassol,
    description: 'Фото дома в старом городе в Лимассоле',
    likeDescription: 'Кнопка для лайка карточки Лимассол'
  },
  {
    name: 'Никосия',
    link: nikosia,
    description: 'Фото окна в старом городе в Никосии',
    likeDescription: 'Кнопка для лайка карточки Никосия'
  },
  {
    name: 'Пафос',
    link: paphos,
    description: 'Фото маяка в Пафосе',
    likeDescription: 'Кнопка для лайка карточки Пафос'
  },
  {
    name: 'Курион',
    link: kurion,
    description: 'Фото восстановленного амфитеатра в Курионе',
    likeDescription: 'Кнопка для лайка карточки Курион'
  },
  {
    name: 'Церковь в горах',
    link: church,
    description: 'Фото церкви в горах',
    likeDescription: 'Кнопка для лайка карточки церкви'
  }
];

export { initialCards };