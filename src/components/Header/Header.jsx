import Heading from '../Heading/Heading';
import './Header.css';

const Header = ({ darkTheme, darkThemeToggle }) => {
  return (
    <header className='header'>
      <Heading />
      <button className='theme-button' onClick={darkThemeToggle}>
        {darkTheme ? '🌙' : '☀️'}
      </button>
    </header>
  );
};

export default Header;
