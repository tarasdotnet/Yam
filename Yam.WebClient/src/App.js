import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoot/AppRoutes';
import Navbar from './AppRoot/Navbar';
import AuthProvider from 'react-auth-kit/AuthProvider';
import createStore from 'react-auth-kit/createStore';

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

export default function App() {
  return (
    <AuthProvider store={store}>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}
