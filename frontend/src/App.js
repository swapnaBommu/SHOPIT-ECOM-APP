import './App.css';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import {Toaster} from 'react-hot-toast';
import useUserRoutes from './components/routes/UserRoutes';
import useAdminRoutes from './components/routes/AdminRoutes';
function App() {
  const userRoutes = useUserRoutes();
  const adminRoutes = useAdminRoutes();
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center"/>
        <Header />
        <div className="container">
          <Routes>
            {userRoutes}
            {adminRoutes}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
