import { render, screen } from '@testing-library/react';
import MasterMindApp from './MasterMindApp';

test('renders learn react link', () => {
  render(<MasterMindApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
