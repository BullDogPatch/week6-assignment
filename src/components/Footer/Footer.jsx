import { FaSquareGithub } from 'react-icons/fa6';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <p className='made-by'>Made with ❤️ by Craig Clayton</p>
      <a
        href='https://github.com/BullDogPatch/week6-assignment'
        target='_blank'
        rel='noopener noreferrer'
        className='github-link'
      >
        <FaSquareGithub size={30} />
      </a>
    </footer>
  );
};

export default Footer;
