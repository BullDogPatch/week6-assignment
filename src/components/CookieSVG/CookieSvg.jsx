import cookie from '../../assets/cookie.svg';
import './CookieSVG.css';

const CookieSVG = ({ incrementCookie }) => {
  return (
    <img
      className='cookie'
      src={cookie}
      alt='cookie'
      onClick={incrementCookie}
    />
  );
};

export default CookieSVG;
