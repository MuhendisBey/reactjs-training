import { render, screen } from '@testing-library/react';
import HRApp from './HRApp';

test('renders learn react link', () => {
  render(<HRApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
