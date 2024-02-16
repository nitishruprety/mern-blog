import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Dashboard } from "./pages/home/Dashboard"
import { CmsLayout } from "./layouts/CmsLayout"
import { Login } from "./pages/auth/Login"
import { PrivateRoute } from "./components/PrivateRoute"

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/cms" element={<CmsLayout />}>

        <Route path="dashboard" element={<PrivateRoute element={<Dashboard />} />} />

        <Route path="login" element={<Login />} />
        
      </Route>
    </Routes>
  </BrowserRouter>
}

export default App
