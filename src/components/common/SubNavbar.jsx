import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";

// Reusable Dropdown Menu Component with Links
const DropdownMenu = ({ label, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false); // Close dropdown when a link is clicked
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        className="text-lg font-medium flex items-center gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label} <BiChevronDown className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-36 bg-white text-black rounded-lg shadow-lg z-50">
          <ul className="py-2">
            {options.map(({ name, path }, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLinkClick}
              >
                <Link to={path} className="w-full block">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Main SubNavbar Component
const SubNavbar = ({ params }) => {
  return (
    <div className="w-full flex items-center justify-center gap-5 p-5">
      <DropdownMenu
        label="Overview"
        options={[
          { name: "Main", path: `/details/${params.id}` },
          { name: "Cast", path: `/details/${params.id}/allCast` },
        ]}
      />
      <DropdownMenu
        label="Media"
        options={[
          { name: "Backdrops", path: `/details/${params.id}/backdrops` },
          { name: "Posters", path: `/details/${params.id}/posters` },
          { name: "Logos", path: `/details/${params.id}/logos` },
          { name: "Videos", path: `/details/${params.id}/videos` },
        ]}
      />
      <div>
        <Link to={`/details/${params.id}/reviews`}>
          <button className="text-lg font-medium flex items-center gap-1">
            Reviews
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SubNavbar;
