import { Link } from 'react-scroll';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>VentureVector</h1>
            <div className="navbar-buttons">
                <Link activeClass="active" to="hero" smooth={true} duration={1000} spy={true}>
                    Home
                </Link>
                <Link activeClass="active" to="examples" smooth={true} duration={1000} spy={true}>
                    Examples
                </Link>
                <Link activeClass="active" to="search" smooth={true} duration={1000} spy={true}>
                    Search
                </Link>
                <Link activeClass="active" to="about" smooth={true} duration={1000} spy={true}>
                    About
                </Link>
            </div>
            <button className="signin-button">Sign in</button>
        </nav>
    );
};

export default Navbar;