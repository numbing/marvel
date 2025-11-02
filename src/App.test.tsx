import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('./features/search/SearchPage', () => () => <div>Search Page</div>);
jest.mock('./pages/IssuePage', () => () => <div>Issue Page</div>);

test('renders navbar and home route', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Comics Explorer/i)).toBeInTheDocument();
  expect(screen.getByText(/Search Page/i)).toBeInTheDocument();
});
