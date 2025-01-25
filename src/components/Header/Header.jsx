import Heading from '../Heading/Heading';
import './Header.css';

const Header = ({ theme, setTheme }) => {
  return (
    <header className='header'>
      <Heading />
      <button className='theme-button' onClick={setTheme}>
        {theme === 'light' ? '☀️' : '🌙'}
      </button>
    </header>
  );
};

export default Header;
