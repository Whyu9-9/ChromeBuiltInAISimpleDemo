import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders demo chat screen', () => {
  render(<App />);
  const linkElement = screen.getByText(/Built-in AI Demo/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders form input', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Ask me anything.../i);
  expect(inputElement).toBeInTheDocument();
});

test('renders form submit button', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeInTheDocument();
});

test('shows chat messages from user input', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Ask me anything.../i);
  fireEvent.change(inputElement, { target: { value: 'Hello' } });
  const buttonElement = screen.getByRole('button');
  fireEvent.click(buttonElement);
  const messageElement = screen.getByText(/Hello/i);
  expect(messageElement).toBeInTheDocument();
});