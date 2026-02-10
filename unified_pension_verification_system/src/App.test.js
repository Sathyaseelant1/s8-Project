import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';
import { AuthProvider } from './context/AuthContext';

test('renders login screen', () => {
  render(
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
  const heading = screen.getByText(/Unified Pension Verification/i);
  expect(heading).toBeInTheDocument();
});
