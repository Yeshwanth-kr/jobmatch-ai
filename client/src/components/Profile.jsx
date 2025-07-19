import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useUser } from "../context/UserContext.jsx";

const Profile = () => {
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth();
  const { name } = useUser();
  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (res.status === 200) {
        setAuthenticated(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bottom-0 w-full h-[12%] justify-between flex p-2 items-center">
      <p className="font-bold">
        {name.split(" ")[0]}
        <br></br>
        {name.split(" ")[1] && name.split(" ")[1]}
      </p>
      <button
        onClick={handleLogout}
        className="h-10 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition ease-in-out delay-50 duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
