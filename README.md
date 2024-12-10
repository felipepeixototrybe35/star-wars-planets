Neste projeto é desenvolvido uma lista com filtros de planetas do universo Star Wars usando Context API e Hooks para controlar os estados globais.

Requisito 1 - Requisição para o endpoint /planets da API de Star Wars e preenchimento de uma tabela com os dados retornados.
  A coluna residents de cada planeta é apagada antes de salvar os dados recebidos da API no contexto.
  A primeira linha da tabela contém os headers de cada coluna. As demais linhas são as informações de cada planeta recebido da API.

Requisito 2 - Filtro de texto para a tabela.
  A tabela é atualizada com os planetas que se encaixam no filtro à medida que o nome é digitado, sem ter de apertar um botão para efetuar a filtragem. Por    exemplo, se for digitado "Tatoo" no campo de texto, o planeta "Tatooine" deve ser exibido.

Requisito 3 - Filtro para valores numéricos.
  O filtro funcionará com três seletores:
  O primeiro abre um dropdown que permite o usuário selecionar uma das seguintes colunas: population, orbital_period, diameter, rotation_period e surface_water.
  O segundo determina se a faixa de valor será maior que, menor que ou igual a o numero que virá a seguir.
  O terceiro é uma caixa de texto que só aceita números.
  A combinação desses três seletores, após a pessoa usuária clicar no botão, deve filtrar os dados da tabela de acordo com a coluna correspondente e com os valores escolhidos.

Requisito 4 - Múltiplos filtros numéricos.
  É possível adicionar múltiplos filtros numéricos. Todos os filtros adicionados funcionam de forma conjunta.

Requisito 5 - Testes unitários.

Requisito 6 - Sem filtros repetidos.
   Caso um filtro seja totalmente preenchido, um novo filtro de valores numéricos é carregado.
   O novo filtro não inclui quaisquer colunas que já tenham sido selecionadas em filtros de valores numéricos anteriores.

Requisito 7 - Remover filtragem ou todas as filtragem.
  Apague um filtro de valor numérico ao clicar no ícone X de um dos filtros e apague todas as filtragens numéricas simultaneamente ao clicar no botão          Remover Filtros.

Requisito 8 - Testes unitários e de integração.

Requisito 9 - Filtro de ordenação descendente e ascendente.
  A ordenação é feita via filtro: um dropdown selecionará a coluna a basear a ordenação e um par de radio buttons determina se a coluna é ascendente ou        descendente.

Requisito 10 - Testes unitários e de integração.
    




