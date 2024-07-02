import React from 'react';
import { render, screen } from '@testing-library/react';
import { DemoIntro } from './components/DemoIntro';
import { Body } from './components/Body';
import { BrowserException } from './components/BrowserException';
import { Form } from './components/Form';
import { Loader } from './components/Loader';
import { Main } from './components/Main';
import { ResponseTime } from './components/ResponseTime';

test('Renders demo intro component', () => {
  render(<DemoIntro messages={[]} />);
  const demoIntro = screen.getByText(/built-in ai demo/i);
  expect(demoIntro).toBeInTheDocument();
});

test('Renders demo intro component with messages', () => {
  render(<DemoIntro messages={[{ id: 1, text: 'Hello', isUser: true }]} />);
  const demoIntro = screen.getByText(/Hidden/i);
  expect(demoIntro).toBeInTheDocument();
});

test('Renders body component', () => {
  render(<Body children={<div>Hello</div>} />);
  const body = screen.getByText(/Hello/i);
  expect(body).toBeInTheDocument();
});

test('Renders Browser Exception component with Chrome', () => {
  render(<BrowserException isChrome={true} />);
  const browserException = screen.getByText(/Hidden/i);
  expect(browserException).toBeInTheDocument();
});

test('Renders Browser Exception component without Chrome', () => {
  render(<BrowserException isChrome={false} />);
  const browserException = screen.getByText(/Sorry/i);
  expect(browserException).toBeInTheDocument();
});

test('Renders Form component', () => {
  render(<Form
    handleChange={jest.fn()} handleSubmit={jest.fn()}
    input=''
    isChrome={true}
    textareaRef={React.createRef()}
  />);
  const form = screen.getByPlaceholderText(/Ask me anything.../i);
  expect(form).toBeInTheDocument();
});

test('Renders Loader component with loading', () => {
  render(<Loader loading={true} />);
  const loader = screen.getByTestId('loader');
  expect(loader).toBeInTheDocument();
});

test('Renders Loader component without loading', () => {
  render(<Loader loading={false} />);
  const loader = screen.getByText(/Hidden/i);
  expect(loader).toBeInTheDocument();
});

test('Renders Main component', () => {
  render(<Main children={<div>Hello</div>} />);
  const main = screen.getByText(/Hello/i);
  expect(main).toBeInTheDocument();
});

test('Renders response time component from non-user', () => {
  render(<ResponseTime message={{ id: 1, text: 'Hello', isUser: false, responseTime: 0 }} />);
  const responseTime = screen.getByText(/s/i);
  expect(responseTime).toBeInTheDocument();
});

test('Renders response time component from user', () => {
  render(<ResponseTime message={{ id: 1, text: 'Hello', isUser: true, responseTime: 0 }} />);
  const responseTime = screen.getByText(/Hidden/i);
  expect(responseTime).toBeInTheDocument();
});



