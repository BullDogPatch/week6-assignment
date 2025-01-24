import cookie from '../../assets/cookie.svg';
import './CookieSVG.css';

const CookieSVG = ({ setTotalCookies }) => {
  return (
    <img
      className='cookie'
      src={cookie}
      alt='cookie'
      onClick={() => setTotalCookies((cookie) => cookie + 1)}
    />
  );
};

export default CookieSVG;
