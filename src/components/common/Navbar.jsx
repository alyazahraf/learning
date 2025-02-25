import { useState, useEffect } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";

const navbars = [
  { text: "Home", link: "/" },
  { text: "Movies", link: "/movie" },
  { text: "TV Show", link: "/tv" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";
  const [search, setSearch] = useState(query);
  const [firstSearchDone, setFirstSearchDone] = useState(!!query);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setSearch(query);
  }, [query]);

  useEffect(() => {
    if (!firstSearchDone || search === query) return;
    const delay = setTimeout(() => {
      navigate(`/search?query=${encodeURIComponent(search)}`, {
        replace: true,
      });
    }, 300);
    return () => clearTimeout(delay);
  }, [search, query, navigate, firstSearchDone]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(search)}`);
      setFirstSearchDone(true);
    }
  };

  const handleSearchClick = () => {
    if (search.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(search)}`);
      setFirstSearchDone(true);
    }
  };

  return (
    <div
      className={`fixed w-full max-w-[calc(100%-80px)] z-50 top-0 transition-all duration-300 overflow-hidden ${
        isScrolled ? "bg-black bg-opacity-80 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center py-4 ">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">Moovie</Link>
        </div>

        {/* Search Bar (Hidden in Mobile) */}
        <div className="hidden md:flex items-center bg-transparent rounded-md px-3 py-1 border border-white">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none bg-transparent text-white px-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearchClick}>
            <FaSearch className="text-white" />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {navbars.map((navbar, index) => (
            <Link key={index} to={navbar.link} className="text-white p-2">
              {navbar.text}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden top-16 left-0 w-full bg-black bg-opacity-90 transition-transform duration-300">
          <div className="flex flex-col items-center space-y-4 py-5">
            {/* Search Bar in Mobile Menu */}
            <div className="flex items-center bg-transparent rounded-md px-3 py-1 border border-white w-4/5">
              <input
                type="text"
                placeholder="Search..."
                className="outline-none bg-transparent text-white px-2 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button onClick={handleSearchClick}>
                <FaSearch className="text-white" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col items-center justify-between space-y-3">
              {navbars.map((navbar, index) => (
                <Link
                  key={index}
                  to={navbar.link}
                  className="text-white p-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {navbar.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
