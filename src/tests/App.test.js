import React from 'react';
import { findByAltText, findByTestId, findByText, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import Provider from '../contexts/Provider';
import userEvent from '@testing-library/user-event';
import planetsData from './planetsData';
describe('Teste dos formulários', () => { 
  
  it('Testa a requisição da api', async () => {
    
    jest.spyOn(global,'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(planetsData),
    });
    render(<Provider><App/></Provider>)
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
  });
  it('Testa a funcionalidade do campo name', async () => {
    jest.spyOn(global,'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(planetsData),
    });
    render(<Provider><App/></Provider>)
    const inputNamePlanet = screen.getByRole('textbox', {  name: /nome do planeta/i})
      expect(inputNamePlanet).toBeInTheDocument();
      const table = screen.getByRole('table', {  name: /planet table/i})
      expect(table).toBeInTheDocument();        
      const firstPlanetName = await screen.findByRole('cell', {
        name: /tatooine/i
      });     
      const initialRowsElements = screen.getAllByRole('row');
      expect(initialRowsElements).toHaveLength(11);
      userEvent.type(inputNamePlanet,'h')
      const filteredRowsElements = screen.getAllByRole('row');
      expect(filteredRowsElements).toHaveLength(3);
      
  });

  it('Testa as funcionalidades dos campos coluna, operador, value e do button filtrar', async () => {
    jest.spyOn(global,'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(planetsData),
    });
    render(<Provider><App/></Provider>)
    const firstPlanetName = await screen.findByRole('cell', {
      name: /tatooine/i
    }); 
    const columnInput = screen.getByRole('combobox', {
      name: /coluna/i
    })
    const operatorInput = screen.getByRole('combobox', {
      name: /operador/i
    })
    const valueInput = screen.getByRole('spinbutton')
    const filterButton= screen.getByRole('button', {
      name: /filtrar/i
    })

    userEvent.selectOptions(columnInput,['diameter'])
    userEvent.selectOptions(operatorInput,['igual a'])
    userEvent.type(valueInput,'4900');
    userEvent.click(filterButton);
    const filteredRowsElements = screen.getAllByRole('row');
    expect(filteredRowsElements).toHaveLength(2);
    
    


  });
  it('Testa as funcionalidades do select ordenar, sort e botão ordenar', async () => {
    jest.spyOn(global,'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(planetsData),
    });
    render(<Provider><App/></Provider>)
    const firstPlanetName = await screen.findByRole('cell', {
      name: /tatooine/i
    }); 

    const ordenarInput = screen.getByRole('combobox', {
      name: /ordenar/i
    })

    const sortInput = screen.getByRole('radio', {
      name: /descendente/i
    })
    const sortAscInput = screen.getByRole('radio', {
      name: /ascendente/i
    })
    const ordenarButton = screen.getByRole('button', {
      name: /ordenar/i
    })

    userEvent.selectOptions(ordenarInput, ['diameter'] )
    userEvent.click(sortInput);
    userEvent.click(ordenarButton);
    
    const initialRowsElements = screen.getAllByRole('row');
    const firstCellText = screen.getAllByRole('cell');
    expect(firstCellText[0].textContent).toBe('Bespin');

    userEvent.click(sortAscInput);
    userEvent.click(ordenarButton);

    const secondCellText = screen.getAllByRole('cell');
    expect(secondCellText[0].textContent).toBe('Endor');

  });

  it('Testa as funcionalidades da remoção dos filtros', async () => {
    jest.spyOn(global,'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(planetsData),
    });
    render(<Provider><App/></Provider>)
    const firstPlanetName = await screen.findByRole('cell', {
      name: /tatooine/i
    }); 
    const columnInput = screen.getByRole('combobox', {
      name: /coluna/i
    })
    const operatorInput = screen.getByRole('combobox', {
      name: /operador/i
    })
    const valueInput = screen.getByRole('spinbutton')
    const filterButton= screen.getByRole('button', {
      name: /filtrar/i
    })
    
    
    userEvent.selectOptions(columnInput,['diameter'])
    userEvent.selectOptions(operatorInput,['menor que'])
    userEvent.type(valueInput,'8900');
    userEvent.click(filterButton);

    userEvent.selectOptions(columnInput,['population'])
    userEvent.selectOptions(operatorInput,['igual a'])
    userEvent.clear(valueInput);
    userEvent.type(valueInput,'30000000');
    userEvent.click(filterButton);


    const initialRowsElements = screen.getAllByRole('row');    
    const firstCellText = screen.getAllByRole('cell');
    expect(firstCellText[0].textContent).toBe('Endor');
    expect(initialRowsElements).toHaveLength(2)
    const deletePopulationFilterButton = screen.getAllByTestId('DeleteIcon')
    userEvent.click(deletePopulationFilterButton[1])
    const secondRowsElements = screen.getAllByRole('row');
    expect(secondRowsElements).toHaveLength(3)
    const deleteAllFilterButton = screen.getByTestId('DeleteForeverIcon')
    userEvent.click(deleteAllFilterButton)
    const thirdRowsElements = screen.getAllByRole('row');
    expect(thirdRowsElements).toHaveLength(11)

    
    userEvent.selectOptions(columnInput,['population'])
    userEvent.selectOptions(operatorInput,['maior que'])
    userEvent.clear(valueInput);
    userEvent.type(valueInput,'0');
    userEvent.click(filterButton);

    userEvent.selectOptions(columnInput,['orbital_period'])
    userEvent.selectOptions(operatorInput,['menor que'])
    userEvent.clear(valueInput);
    userEvent.type(valueInput,'1000');
    userEvent.click(filterButton);



    const fourthRowsElements = screen.getAllByRole('row');
    expect(fourthRowsElements).toHaveLength(7)
    const deleteFilterMaiorQue = screen.getAllByTestId('DeleteIcon');
    userEvent.click(deleteFilterMaiorQue[0]);
    userEvent.click(deleteFilterMaiorQue[1]);
    
  });
  it('Teste filtro', async () => {
    jest.spyOn(global,'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(planetsData),
    });
    render(<Provider><App/></Provider>)
    const firstPlanetName = await screen.findByRole('cell', {
      name: /tatooine/i
    }); 
    const columnInput = screen.getByRole('combobox', {
      name: /coluna/i
    })
    const operatorInput = screen.getByRole('combobox', {
      name: /operador/i
    })
    const valueInput = screen.getByRole('spinbutton')
    const filterButton= screen.getByRole('button', {
      name: /filtrar/i
    })

    userEvent.selectOptions(columnInput,['surface_water'])
    userEvent.selectOptions(operatorInput,['maior que'])
    userEvent.type(valueInput,'0');
    userEvent.click(filterButton);

    userEvent.selectOptions(columnInput,['population'])
    userEvent.selectOptions(operatorInput,['maior que'])
    userEvent.type(valueInput,'0');
    userEvent.click(filterButton);

    const deleteFilter = screen.getAllByTestId('DeleteIcon')
    userEvent.click(deleteFilter[0])
    

   
  });

  it('Ascendente e Descendente com unknown', async () => {
    jest.spyOn(global,'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(planetsData),
    });
    render(<Provider><App/></Provider>)
    const firstPlanetName = await screen.findByRole('cell', {
      name: /tatooine/i
    }); 

    const ordenarInput = screen.getByRole('combobox', {
      name: /ordenar/i
    })

    const sortDescInput = screen.getByRole('radio', {
      name: /descendente/i
    })
    const sortAscInput = screen.getByRole('radio', {
      name: /ascendente/i
    })
    const ordenarButton = screen.getByRole('button', {
      name: /ordenar/i
    })

    userEvent.click(sortDescInput);
    userEvent.click(ordenarButton);
    userEvent.click(sortAscInput);
    userEvent.click(ordenarButton);
  });
  
 })
