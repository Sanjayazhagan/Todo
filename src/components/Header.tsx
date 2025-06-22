import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { LogOut } from "../Util/LogOut";

interface user {
  name: string | null;
  photourl: string | null;
}

function Header() {
  const [user, setUser] = useState<user | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("👤 Logged in user:", user);
        setUser({ name: user.displayName, photourl: user.photoURL });
      } else {
        console.log("🚫 Not logged in");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    LogOut();
    setUser(null);
    setDropdownOpen(false);
  };

  return (
    <header className="bg-indigo-600 text-white px-4 py-3 shadow-md relative">
      <div className="mx-auto flex sm:flex-row items-center justify-between gap-2 sm:gap-0">
        <Link to={"/"}>
          <h1 className="text-2xl font-bold tracking-wide text-center sm:text-left">
            📝 My To-Do List
          </h1>
        </Link>
        <div className="flex items-center gap-4 relative">
          {user ? (
            <div className="relative">
              <img
                src={
                  user.photourl ||
                  `https://ui-avatars.com/api/?name=${user.name}`
                }
                alt="Avatar"
                className="w-8 h-8 rounded-full border-2 border-white cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-lg shadow-lg z-10">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to={"/signin"}>
              <button className="bg-white text-black p-2 rounded-2xl shadow">
                Signin
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
