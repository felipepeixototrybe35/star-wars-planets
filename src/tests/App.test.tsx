import React from 'react';
import userEvent from '@testing-library/user-event';
import Table from '../components/Table';
import SWProvider from '../context/SWprovider';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';

// test('A renderização de Table e seus elementos', () => {
//   render(<SWProvider ><Table /></SWProvider>);
//   expect(screen.getByPlaceholderText('Search planet')).toBeInTheDocument();
//   expect(screen.getByRole('table')).toBeInTheDocument();
//   expect(screen.getByText('Coluna')).toBeInTheDocument();
//   expect(screen.getByText('Operador')).toBeInTheDocument();
//   expect(screen.getByRole('button', { name: 'Filtrar' })).toBeInTheDocument();
// });

// test('A renderização de App', () => {
//   render(<App />);
//   expect(screen.getByPlaceholderText('Search planet')).toHaveAttribute('type', 'text');
//   expect(screen.getByRole('table')).toBeInTheDocument();
//   expect(screen.getByText('Coluna')).toBeInTheDocument();
//   expect(screen.getByText('Operador')).toBeInTheDocument();
//   expect(screen.getByRole('button', { name: 'Filtrar' })).toBeInTheDocument();
// });

// test('Testa o input Search planet', async () => {
//   render(<SWProvider ><Table /></SWProvider>);
//   waitFor(() => {
//    const inputTest = screen.getByPlaceholderText('Search planet');
//   userEvent.type(inputTest, 'd');
//   expect(screen.getByText('Tatooine')).not.toBeInTheDocument();
// })
// });

// test('Testando os filtros', async () => {
//   render(<SWProvider ><Table /></SWProvider>);
//   waitFor(() => {
//     userEvent.type(screen.getByTestId("value-filter"), '200000000000');
//     userEvent.click(screen.getByRole('button', { name: 'Filtrar' }));
//      expect(screen.getByText('Alderaan')).not.toBeInTheDocument();
//   })
// });

// test('Testando os filtros parte 2', async () => {
//   render(<SWProvider ><Table /></SWProvider>);
//   waitFor(() => {
//    expect(screen.getByRole('combobox')).toHaveValue([
//     'population',
//     'orbital_period',
//     'diameter',
//     'rotation_period',
//     'surface_water',
//   ])
//   const diam = screen.getByRole('option', { name: 'diameter'});
//   expect(diam).toBeInTheDocument();
//   userEvent.click(diam);
//   const equal = screen.getByRole('option', { name: 'igual a'});
//   expect(equal).toBeInTheDocument();
//   userEvent.click(equal);
//   userEvent.type(screen.getByTestId("value-filter"), '7200');
//   userEvent.click(screen.getByRole('button', { name: 'Filtrar' }));
//   userEvent.click(screen.getByTestId("button-remove-filters"));
// })
// });

describe('Testes StarWars Planets', () => {

  const searchPlanet = 'Search planet';
  const valueFilter = 'value-filter';
  const columnFilter = 'column-filter';
  const filter = 'Filtrar';
  const comparisonFilter = 'comparison-filter';

  test('Testa o input Search planet', async () => {
    render(<App />);
    const searchFilter = screen.getByPlaceholderText(searchPlanet);
    fireEvent.change(searchFilter, { target: { value: 'Alderaan' } });
  }); 
  
  test('Testa os inputs: comparação, coluna e valor; e o botão de filtrar', async () => {
    render(<App />);
    const comparison = screen.getByTestId(comparisonFilter);
    fireEvent.change(comparison, { target: { value: 'menor que'}});
  
    const value = screen.getByTestId(valueFilter);
    fireEvent.change(value, { target: { value: '10000' } });
  
    const inputBtn = screen.getByTestId(columnFilter);
    fireEvent.change(inputBtn, { target: { value: 'diameter' } });
  
    const filterBtn = screen.getByRole('button', { name: filter });
    fireEvent.click(filterBtn);
  });
  
  test('Verifica se permite filtrar por colunas', () => {
    render(<App />);
    
  });
});
