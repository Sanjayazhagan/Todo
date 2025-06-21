function Footer(){
    return <footer className="bg-indigo-600 text-white mt-10 px-4 py-4 absolute bottom-0 w-full">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 text-sm">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} My To-Do App. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-white/90">
          <a
            href="https://github.com/Sanjayazhagan"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://vercel.com/sanjay-azhagans-projects/todo"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hosted on Vercel
          </a>
        </div>
      </div>
    </footer>
}
export default Footer