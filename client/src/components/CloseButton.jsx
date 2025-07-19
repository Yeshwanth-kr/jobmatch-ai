import { useMenu } from "../context/MenuContext.jsx";
import { RxCross2 } from "react-icons/rx";

const CloseButton = () => {
  const { setMenuOpen } = useMenu();
  const closeMenu = (e) => {
    e.preventDefault();
    setMenuOpen(false);
  };
  return (
    <div className="h-[5%] w-full flex-col-reverse p-1">
      <button
        className="xl:hidden mr-1 h-10 w-10 hover:bg-gray-200 transition ease-in-out delay-50 duration-300 rounded-md right-0 absolute flex justify-center items-center"
        onClick={closeMenu}
      >
        <RxCross2 size={35} />
      </button>
    </div>
  );
};

export default CloseButton;
