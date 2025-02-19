import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";

const navbars = [
  {
    text: "Home",
    link: "/",
  },
  {
    text: "Movies",
    link: "/movie",
  },
  {
    text: "TV Show",
    link: "/tv",
  },
];

const navbarItems = navbars.map((navbar, index) => {
  return (
    <Link key={index} to={navbar.link} className="text-white p-2">
      {navbar.text}
    </Link>
  );
});

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";
  const [search, setSearch] = useState(query);
  const [firstSearchDone, setFirstSearchDone] = useState(!!query);

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
    <nav
      className={`pr-10 py-5 flex justify-between fixed w-full z-50 top-0 items-center transition-all duration-300 ${
        isScrolled ? "bg-black bg-opacity-80 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="text-white text-2xl font-bold">
        <Link to="/">Moovie</Link>
      </div>
      <div className="flex items-center bg-transparent rounded-md px-3 py-1 border border-white">
        <input
          type="text"
          placeholder="Search..."
          className="outline-none bg-transparent text-white px-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearchClick} className="text-black">
          <FaSearch className="text-white" />
        </button>
      </div>
      <div className="pr-10">{navbarItems}</div>
    </nav>
  );
};

export default Navbar;
