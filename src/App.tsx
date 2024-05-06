import './App.css'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Router from './Router';
import AuthProvider from './auth/AuthProvider';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </Provider>
  )
}

export default App


