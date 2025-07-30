import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Components/default';
import { Box } from '@mui/material'

//components
import Header from './Components/Header/Header';
import DetailView from './Components/ItemDetails/DetailView';
import TemplateProvider from './templates/TemplateProvider';
import ContextProvider from './context/ContextProvider';
import { ThemeProviderWrapper } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Cart from './Components/Cart/Cart';
import UserProfile from './Components/Profile/UserProfile';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <ThemeProviderWrapper>
      <AuthProvider>
        <TemplateProvider>
          <ContextProvider>
            <BrowserRouter>
              <Header />
              <Box style={{marginTop: 54}}>
                              <Routes>
                <Route path= '/' element={<Home />} />
                <Route path= '/cart' element={<Cart />} />
                <Route path= '/product/:id' element={<DetailView />} />
                <Route path= '/profile' element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                } />
              </Routes>
              </Box>
            </BrowserRouter>
          </ContextProvider>
        </TemplateProvider>
      </AuthProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
