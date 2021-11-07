import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header, footer and main content', () => {
  render(<App />);
  const headerElement = screen.getByText('BROCCOLI & CO.');
  expect(headerElement).toBeInTheDocument();
});
