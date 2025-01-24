import cookie from '../../assets/cookie.svg';

const CookieSVG = ({ setTotalCookies }) => {
  return (
    <img
      src={cookie}
      alt='cookie'
      onClick={() => setTotalCookies((cookie) => cookie + 1)}
    />
  );
};

export default CookieSVG;
