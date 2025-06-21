import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Root from './Pages/Root'
import HomePage from './Pages/HomePage'
import SpacePage from './Pages/SpacePage'
import { usePresistedState } from './Hooks/UsePresitantState'
export interface Data{
  id:string,
  title:string,
  tasks:{id:number,
      title:string,
      completed:boolean,
      deadline:string,
    }[]
}
function App() {
  const ispaces :Data[] = [
    {
      id: "personal",
      title: "Personal",
      tasks: [
      ],
    }
  ];
  const [spaces,setSpaces]=usePresistedState("1",ispaces)
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Root/>,
      children:[{
        index:true,
        element:<HomePage data={spaces} change={setSpaces}/>
      },
      {
        path:"/space/:Spacename",
        element:<SpacePage data={spaces} change={setSpaces}/>
      }
    ]
    }
  ])
  return (<RouterProvider router={router}/>)
}

export default App
