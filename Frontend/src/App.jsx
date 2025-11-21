import { createBrowserRouter } from "react-router-dom";
import Login from "./Components/Pages/Login";
import HomePage from "./Components/Pages/HomePage";
import RulesList from "./Components/Pages/RulesList";
import RulePage from "./Components/Pages/RulePage";
import PageLayout from "./Components/Pages/PageLayout";
import NotFound from "./Components/Pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
const router = createBrowserRouter([
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/",
    element:<ProtectedRoute>
      <PageLayout/>
    </ProtectedRoute>,
    children:[
      {
        path:"",
        element:<HomePage/>
      },
      {
        path:"profile/:profileId",
        element:<RulesList/>,
      },{
         path:'profile/:profileId/:ruleId',
        element:<RulePage/>
      },
      {
        path:"*",
        element:<NotFound/>
      }
      
    ]
  }
]);

export default router
