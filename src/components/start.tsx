function Start({Toggle}:{Toggle:()=>void}){
    return <div className="bg-white rounded-2xl shadow-md p-6 max-w-md mx-auto text-center">
      <div className="text-5xl mb-4">🚀</div>
      <h2 className="text-xl font-semibold mb-2">Welcome to Your Space</h2>
      <p className="text-gray-600 mb-4">
        Organize your thoughts, plan your tasks, and stay productive.
      </p>
      <button onClick={()=>{Toggle()}} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
        Create Your First Task
      </button>
    </div>
}
export default Start