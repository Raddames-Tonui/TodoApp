import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { TodoProvider } from "./context/TodoContext";

import Layout from "./Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import SignUpForm from "./pages/SignUpForm";
import UpdateUser from "./pages/UpdateUser";
import Todo from "./pages/Todo";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <TodoProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/users/signin" element={<Login />} />
              <Route path="/users/signup" element={<SignUpForm />} />
              <Route path="/users/tasks" element={<Todo />} />              
              <Route path="/users/profile_update" element={<UpdateUser/>}/>
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </TodoProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
