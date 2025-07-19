import { useMenu } from "../context/MenuContext.jsx";
import { IoIosMenu } from "react-icons/io";

const OpenButton = () => {
  const { menuOpen, setMenuOpen } = useMenu();
  const openMenu = (e) => {
    e.preventDefault();
    setMenuOpen(true);
  };
  return (
    <button
      className={`xl:hidden w-10 h-10 hover:bg-gray-200 transition ease-in-out delay-50 duration-300 flex justify-center items-center mt-1.5 absolute rounded-md ${
        menuOpen ? "hidden" : ""
      }`}
      onClick={openMenu}
    >
      <IoIosMenu size={35} />
    </button>
  );
};

export default OpenButton;
