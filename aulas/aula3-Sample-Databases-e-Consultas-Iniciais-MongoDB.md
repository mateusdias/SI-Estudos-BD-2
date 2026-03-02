# Aula 3 - Sample Databases e Consultas Iniciais no MongoDB Atlas

## Objetivo
Aprender como carregar os bancos de exemplo (sample databases) no MongoDB Atlas e executar consultas simples na colecao `restaurants` do banco `sample_restaurants`.

## Por que usar sample databases

Os sample databases do Atlas sao conjuntos de dados prontos para estudo e testes.

Vantagens para os alunos:

- Praticar consultas sem precisar modelar e inserir tudo do zero.
- Explorar varios dominios (restaurantes, filmes, analytics, etc.).
- Comparar estruturas de documentos reais em colecoes diferentes.

## Como adicionar os sample databases no MongoDB Atlas

> Interface pode ter pequenas variacoes de nome entre versoes do Atlas, mas o fluxo geral e este.

1. Entre no MongoDB Atlas e abra o projeto da disciplina.
2. Acesse o cluster (ex.: `M0`) e clique em `Browse Collections`.
3. Procure a opcao `Load Sample Dataset` (ou `...` > `Load Sample Dataset`).
4. Confirme em `Load Sample Dataset`.
5. Aguarde a carga dos dados.

Ao final, voce deve visualizar varios bancos de exemplo, como:

- `sample_mflix`
- `sample_restaurants`
- `sample_supplies`
- `sample_training`
- `sample_analytics`
- `sample_weatherdata`

## Base de pratica da aula

Nesta aula, usaremos:

- Banco: `sample_restaurants`
- Colecao: `restaurants`

## Consulta simples: cuisine = American

### No MongoDB Compass (filtro JSON)

```json
{ "cuisine": "American" }
```

### No mongosh

```javascript
use sample_restaurants
db.restaurants.find({ cuisine: "American" })
```

## Trocando a consulta: cuisine = Irish

### No MongoDB Compass (filtro JSON)

```json
{ "cuisine": "Irish" }
```

### No mongosh

```javascript
use sample_restaurants
db.restaurants.find({ cuisine: "Irish" })
```

## Exemplo com operador $or

Objetivo: buscar restaurantes com cozinha `Irish` **ou** `American`.

### No MongoDB Compass (filtro JSON)

```json
{
  "$or": [
    { "cuisine": "Irish" },
    { "cuisine": "American" }
  ]
}
```

### No mongosh

```javascript
use sample_restaurants
db.restaurants.find({
  $or: [
    { cuisine: "Irish" },
    { cuisine: "American" }
  ]
})
```

## Boas praticas iniciais para consultas

- Comecar por filtros simples em 1 campo.
- Validar quantidade de resultados com `countDocuments`.
- Salvar filtros frequentes para reutilizacao em aula/lab.
- Evoluir aos poucos: filtro simples -> operadores logicos -> comparacoes -> agregacoes.

## Operadores de comparacao: $lt, $lte, $gt e $gte

Esses operadores permitem filtrar valores por comparacao numerica:

- `$lt` (less than): menor que.
- `$lte` (less than or equal): menor ou igual a.
- `$gt` (greater than): maior que.
- `$gte` (greater than or equal): maior ou igual a.

### Exemplo no banco `sample_mflix`, colecao `movies`

Use o campo `year` para praticar:

### 1. Igualdade absoluta (ano especifico)

No Compass (filtro JSON):

```json
{ "year": 2000 }
```

No mongosh:

```javascript
use sample_mflix
db.movies.find({ year: 2000 })
```

### 2. Filmes acima de 2000

No Compass (filtro JSON):

```json
{ "year": { "$gt": 2000 } }
```

No mongosh:

```javascript
use sample_mflix
db.movies.find({ year: { $gt: 2000 } })
```

### 3. Filmes com ano menor que 1990

No Compass (filtro JSON):

```json
{ "year": { "$lt": 1990 } }
```

No mongosh:

```javascript
use sample_mflix
db.movies.find({ year: { $lt: 1990 } })
```

## Resumo da aula

- O Atlas permite carregar conjuntos prontos com `Load Sample Dataset`.
- O banco `sample_restaurants` e ideal para treinar consultas desde o nivel basico.
- Consultas com igualdade (`cuisine`) e com operador logico (`$or`) sao o primeiro passo para queries mais avancadas.

## Atividade de fixacao

1. Carregue os sample databases no Atlas.
2. Abra `sample_restaurants > restaurants`.
3. Execute as consultas:
   - `{ "cuisine": "American" }`
   - `{ "cuisine": "Irish" }`
   - consulta com `$or` entre `Irish` e `American`
4. Registre quantos documentos cada consulta retornou.
5. Crie mais uma consulta com `$or` usando duas cozinhas a sua escolha.
