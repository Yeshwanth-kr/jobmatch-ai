import Profile from "../components/Profile.jsx";
import Tabs from "../components/Tabs.jsx";
import CloseButton from "../components/CloseButton.jsx";
import { useMenu } from "../context/MenuContext.jsx";
import { useTab } from "../context/TabContext.jsx";
import ATS from "./ATS.jsx";
import History from "./History.jsx";
import ResumeJD from "./ResumeJD.jsx";

const Home = () => {
  const { menuOpen } = useMenu();
  const { tab } = useTab();

  return (
    <div className="w-full h-full flex-row flex gap-0">
      <div
        className={`${
          menuOpen
            ? "w-full xl:w-[20%] flex-col"
            : "hidden xl:block"
        } h-screen  xl:w-[20%] xl:border-r-2`}
      >
        <CloseButton />
        <Tabs />
        <Profile />
      </div>
      <div className={`${menuOpen ? "hidden xl:block" : ""} w-full xl:w-[80%]`}>
        {tab === "ResumeJD" && <ResumeJD />}
        {tab === "ATS" && <ATS />}
        {tab === "History" && <History />}
      </div>
    </div>
  );
};

export default Home;
