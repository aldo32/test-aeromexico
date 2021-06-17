import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

test('Render App', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const titleElement = screen.getByText(/Seleciona tu filtro/i);
  const buttonElement1 = screen.getByText(/Estudiantes/i);
  const buttonElement2 = screen.getByText(/Staff/i);
  const buttonElement3 = screen.getByText(/Todos/i);

  expect(titleElement).toBeInTheDocument();
  expect(buttonElement1).toBeInTheDocument();
  expect(buttonElement2).toBeInTheDocument();
  expect(buttonElement3).toBeInTheDocument();
});

test('Render Menu', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const itemMenu = screen.getByText(/Agregar/i);

  expect(itemMenu).toBeInTheDocument();
});
