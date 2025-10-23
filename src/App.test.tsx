import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './pages/Home/Home';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './auth/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Mock axios to avoid external calls
jest.mock('axios');

// Mock react-router-dom hooks and components for testing without real Router context
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => () => {},
  useLocation: () => ({ pathname: '/', search: '', hash: '', state: null, key: 'test' }),
  Outlet: () => null,
}));

test('renders Home Set AppContext button', () => {
  render(
    <AppProvider>
      <AuthProvider>
        <ToastProvider>
          <MemoryRouter>
            <Home onToggleCookieBanner={() => {}} isCookieBannerVisible={false} />
          </MemoryRouter>
        </ToastProvider>
      </AuthProvider>
    </AppProvider>
  );
  const linkElement = screen.getByText(/Set AppContext/i);
  expect(linkElement).toBeInTheDocument();
});
