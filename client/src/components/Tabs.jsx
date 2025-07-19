import { useTab } from "../context/TabContext";
import { useMenu } from "../context/MenuContext";

const Tabs = () => {
  const { tab, setTab } = useTab();
  const { setMenuOpen } = useMenu();
  return (
    <div className="flex-1 h-[83%] flex-col flex items-center p-2 gap-5">
      <button
        className={`hover:bg-gray-200 transition ease-in-out delay-50 duration-300 w-full p-2 border-gray-700 border-2 rounded-lg max-w-md ${
          tab === "ResumeJD" && "bg-gray-300"
        }`}
        onClick={() => {
          setTab("ResumeJD");
          setMenuOpen(false);
        }}
      >
        Compare Resume and JD
      </button>
      <button
        className={`hover:bg-gray-200 transition ease-in-out delay-50 duration-300 w-full p-2 border-gray-700 border-2 rounded-lg max-w-md ${
          tab === "ATS" && "bg-gray-300"
        }`}
        onClick={() => {
          setTab("ATS");
          setMenuOpen(false);
        }}
      >
        Check ATS Score
      </button>
      <button
        className={`hover:bg-gray-200 transition ease-in-out delay-50 duration-300 w-full p-2 border-gray-700 border-2 rounded-lg max-w-md ${
          tab === "History" && "bg-gray-300"
        }`}
        onClick={() => {
          setTab("History");
          setMenuOpen(false);
        }}
      >
        History
      </button>
    </div>
  );
};

export default Tabs;
