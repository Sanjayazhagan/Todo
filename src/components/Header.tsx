import { Link } from "react-router-dom";
function Header(){
  return (
    <header className="bg-indigo-600 text-white px-4 py-3 shadow-md">
      <div className="mx-auto flex  sm:flex-row items-center justify-between gap-2 sm:gap-0">
        <Link to={"/"}>
        <h1 className="text-2xl font-bold tracking-wide text-center sm:text-left">
          📝 My To-Do List
        </h1>
        </Link>
        <div className="flex items-center gap-4">
          <img
            src="https://ui-avatars.com/api/?name=Sanjay"
            alt="Avatar"
            className="w-8 h-8 rounded-full border-2 border-white"
          />
        </div>
      </div>
    </header>
  );
};
export default Header