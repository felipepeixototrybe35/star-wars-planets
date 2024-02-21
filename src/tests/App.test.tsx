import Table from '../components/Table';
import SWProvider from '../context/SWprovider';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';

describe('Testes StarWars Planets', () => {

  const searchPlanet = 'Search planet';
  const valueFilter = 'value-filter';
  const columnFilter = 'column-filter';
  const filter = 'Filtrar';
  const comparisonFilter = 'comparison-filter';
  const allFilters = 'Remover Filtros';

  test('A renderização de Table e seus elementos', () => {
    render(<SWProvider ><Table /></SWProvider>);
    expect(screen.getByPlaceholderText('Search planet')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Coluna')).toBeInTheDocument();
    expect(screen.getByText('Operador')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Filtrar' })).toBeInTheDocument();
  });

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
  
  test('Testa o botão X de um filtro', async () => {
    render(<App />);
    const comparison = screen.getByTestId(comparisonFilter);
    fireEvent.change(comparison, { target: { value: 'menor que'}});
  
    const value = screen.getByTestId(valueFilter);
    fireEvent.change(value, { target: { value: '10000' } });
  
    const inputBtn = screen.getByTestId(columnFilter);
    fireEvent.change(inputBtn, { target: { value: 'diameter' } });

    const filterBtn = screen.getByRole('button', { name: filter });
    fireEvent.click(filterBtn);

    const remove = screen.getByRole('button', { name: 'X' });
    fireEvent.click(remove);
  });

  test('Testa o botão Remover Filtros', async () => {
    render(<App />);
    const comparison = screen.getByTestId(comparisonFilter);
    fireEvent.change(comparison, { target: { value: 'menor que'}});
  
    const value = screen.getByTestId(valueFilter);
    fireEvent.change(value, { target: { value: '10000' } });
  
    const inputBtn = screen.getByTestId(columnFilter);
    fireEvent.change(inputBtn, { target: { value: 'diameter' } });

    const filterBtn = screen.getByRole('button', { name: filter });
    fireEvent.click(filterBtn);

    fireEvent.change(comparison, { target: { value: 'maior que'}});
    fireEvent.change(value, { target: { value: '400' } });
    fireEvent.change(inputBtn, { target: { value: 'orbital_period' } });
    fireEvent.click(filterBtn);

    const allX = screen.getAllByRole('button', { name: 'X'});
    fireEvent.click(allX[1]);

    const allFilterBtn = screen.getByRole('button', { name: allFilters });
    fireEvent.click(allFilterBtn);
  });

  test('Testa os inputs e o botão de Ordernar', async () => {
    render(<App />);
    const sortColumn = screen.getByTestId('column-sort');
    fireEvent.change(sortColumn, { target: { value: 'population' } });

    const asc = screen.getByTestId('column-sort-input-asc');
    fireEvent.click(asc);
  
    const order = screen.getByRole('button', { name: 'Ordenar' });
    fireEvent.click(order);

    const desc = screen.getByTestId('column-sort-input-desc');
    fireEvent.click(desc);
    fireEvent.click(order);
  });
});
