import React from 'react';
import userEvent from '@testing-library/user-event';
import Table from '../components/Table';
import SWProvider from '../context/SWprovider';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
// import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';

test('A renderização de Table e seus elementos', () => {
  render(<SWProvider ><Table /></SWProvider>);
  expect(screen.getByPlaceholderText('Search planet')).toBeInTheDocument();
  expect(screen.getByRole('table')).toBeInTheDocument();
  expect(screen.getByText('Coluna')).toBeInTheDocument();
  expect(screen.getByText('Operador')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Filtrar' })).toBeInTheDocument();
});

test('A renderização de App', () => {
  render(<App />);
  expect(screen.getByPlaceholderText('Search planet')).toHaveAttribute('type', 'text');
  expect(screen.getByRole('table')).toBeInTheDocument();
  expect(screen.getByText('Coluna')).toBeInTheDocument();
  expect(screen.getByText('Operador')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Filtrar' })).toBeInTheDocument();
});

test('Testa o input Search planet', async () => {
  render(<SWProvider ><Table /></SWProvider>);
  waitFor(() => {
   const inputTest = screen.getByPlaceholderText('Search planet');
  userEvent.type(inputTest, 'd');
  expect(screen.getByText('Tatooine')).not.toBeInTheDocument();
})
});

test('Testando os filtros', async () => {
  render(<SWProvider ><Table /></SWProvider>);
  waitFor(() => {
    userEvent.type(screen.getByTestId("value-filter"), '200000000000')
   userEvent.click(screen.getByRole('button', { name: 'Filtrar' }))
   expect(screen.getByText('Alderaan')).not.toBeInTheDocument();
})
});