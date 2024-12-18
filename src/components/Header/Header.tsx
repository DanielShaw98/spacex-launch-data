import logo from '../../assets/spacex-logo-white.svg';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const isRootPage = location.pathname === '/';
  const isSummaryPage = location.pathname.startsWith('/launch/');

  let title;

  if (isRootPage) {
    title = "Launch Data";
  } else if (isSummaryPage) {
    title = "Launch Summary";
  }

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>
      {title && <h1 className="title">{title}</h1>}
    </header>
  );
};

export default Header;
