import { NavItemInterface } from './NavItem';

interface NavDropdownProps {
  items: NavItemInterface[];
}
const NavDropdown: React.FC<NavDropdownProps> = ({ items }) => {
  return (
    <div className="absolute top-[calc(100%+1.8px)] left-0 w-64 bg-white shadow-lg rounded-md py-2 z-10">
      {items.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className="block px-4 py-2 text-[#584f78] hover:bg-[#f5f3f9] transition-colors duration-200"
        >
          {item.label}
        </a>
      ))}
    </div>
  );
};
export default NavDropdown;
