import React from 'react';
import { render, screen } from '@testing-library/react';
import * as Constants from './Constants';
import App from './App';

test('renders site name', () => {
  render(<App />);
  const linkElement = screen.getByText(new RegExp(Constants.SITE_NAME, 'i'));
  expect(linkElement).toBeInTheDocument();
});
