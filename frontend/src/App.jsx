import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserProvider } from "./context/UserContext";
// import { TodoProvider } from "./context/TodoContext";

import Layout from "./Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import SignUpForm from "./pages/SignUpForm";



function App() {
  return (
    <UserProvider>
      {/* <TodoProvider> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/signin" element={<Login />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      {/* </TodoProvider> */}
    </UserProvider>

  );
}

export default App;
