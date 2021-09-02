import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('Renders Site', () => {
  render(<Router><App /></Router>);
  const linkElement = document.getElementsByTagName('main');
  expect(linkElement[0]).toBeInTheDocument();
});
