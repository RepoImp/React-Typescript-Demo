import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import AuthHandler from './auth/AuthHandler';
import Login from './views/pages/Login';
import DashBoard from './views/pages/DashBoard';
import { useEffect, useState } from 'react';
import { useUserQuery } from './api/auth';
import { actions } from './redux/store/store';
import Sidebar from './components/common/Sidebar';
import Customers from './views/pages/Customers';
import GenerateInvoice from './views/pages/GenerateInvoice';
import Invoices from './views/pages/Invoices';
import Settings from './views/pages/Settings';
import Users from './views/pages/Users';
import { Loader } from './components/common/loading/Loader';

function App() {
  const [stopUserQuery, setStopUserQuery] = useState(false);
  const [loader, setLoader] = useState(true)
  const currentUserQuery = useUserQuery(null);
  useEffect(() => {
    if (!stopUserQuery) {
      actions.auth.setCurrentUser(currentUserQuery.data?.result);
      actions.auth.setLoading(currentUserQuery.isLoading);
    }
    setLoader(false)
  }, [currentUserQuery, stopUserQuery]);
  return (
    <div>
      <div className="wrapper">
        <Router>
          <AuthHandler />
          {!loader && <Sidebar>
            <Routes>
              <Route path='/login' element={<Login onStopUserQuery={setStopUserQuery} />} />
              <Route path='/dashboard' element={<DashBoard />} />
              <Route path='/customers' element={<Customers />} />
              <Route path='/generateInvoice' element={<GenerateInvoice />} />
              <Route path='/invoices' element={<Invoices />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/users' element={<Users />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </Sidebar>}
        </Router>
      </div>
      <Loader />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable
      />
    </div>
  );
}

export default App;
