# Piggy Bank 2 💲

Aplicação, Back-end para gerenciamento financeiro, em que é possível registrar e listar transações. Versão com importação de dados via arquivo .csv e persistência de dados.

Feito como exercício do curso "GoStack".

[Desafio 06: Banco de dados e upload de arquivos no Node.js](https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-database-upload)


## 💾Instalação

1. Clone o repositório  ```git clone {URL_DO_REPOSITORIO}```
2. Execute o comando ```yarn```  na pasta do projeto clonado para instalar todas as dependências.
3. Execute o comando ```yarn dev:server```  para executar o projeto.
4. Execute o comando ```yarn tsc``` para construir a aplicação.

## 💹 Funções

- ### Listar: GET /transactions

  Essa rota deve retornar uma listagem com todas as transações cadastradas, junto com o valor de soma de entradas, retiradas e total de crédito. Essa rota deve retornar um objeto com o formato a seguir:

```
{
  "transactions": [
    {
      "id": "uuid",
      "title": "Salário",
      "value": 4000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Salary",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Freela",
      "value": 2000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Others",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Pagamento da fatura",
      "value": 4000,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Others",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Cadeira Gamer",
      "value": 1200,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Recreation",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    }
  ],
  "balance": {
    "income": 6000,
    "outcome": 5200,
    "total": 800
  }
}
```

- ### Inserir: POST /transactions

  A rota deve receber ```title```, ```value``` e ```type``` dentro do corpo da requisição, sendo ```type``` o tipo da transação, que deve ser ```income``` para entradas (depósitos) e ```outcome``` para saídas (retiradas). Ao cadastrar uma nova transação, ela deve ser no seguinte formato :

```
{
  "id": "uuid",
  "title": "Salário",
  "value": 3000,
  "type": "income",
  "category": "Alimentação"
}
```
**obs:** Uma transação do tipo ```outcome``` só pode ser inserida se existir crédito suficiente no balanço.

- ### Excluir: DELETE /transactions/:id

Deve excluir a transação correspondente ao ```id``` informado.

- ### Importar transações: POST /transactions/import

Esta rota permite a importação de um arquivo com formato .csv contendo as informações necessárias para criação de uma transação:``` title, value, type, category ```, onde cada linha do arquivo CSV deve ser um novo registro para o banco de dados. Todos os registros inseridos são retornados como resposta da solicitação.



## 📑Licença

[MIT] (http://escolhaumalicenca.com.br/licencas/mit/)