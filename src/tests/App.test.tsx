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
  
  test('', () => {
    render(<App />);
    
  });
});
