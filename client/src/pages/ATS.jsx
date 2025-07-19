import OpenButton from "../components/OpenButton.jsx";
import { useMenu } from "../context/MenuContext.jsx";

const ATS = () => {
  const { menuOpen } = useMenu();

  return (
    <div
      className={`${
        menuOpen ? "hidden xl:block" : ""
      } mx-auto px-8 w-full xl:w-[80%] xl:absolute xl:right-0`}
    >
      <OpenButton />
      <h1 className="text-3xl font-bold text-center mb-6">JobMatch AI</h1>
      <div className="h-screen w-full flex justify-center items-center flex-col">
        <h1 className="text-3xl">ATS Score</h1>
        This page is under construction.
      </div>
    </div>
  );
};

export default ATS;
