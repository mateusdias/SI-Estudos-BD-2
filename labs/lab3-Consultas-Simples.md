# Lab 3 - Consultas Simples (MongoDB Sample Databases)

## Objetivo
Praticar consultas simples no MongoDB Atlas usando os bancos de exemplo (`sample databases`), com foco em filtros, operadores lógicos, comparação, arrays e `regex`.

## Dica
Abra o link abaixo e mantenha-o aberto como referência: 

- Documentação oficial MongoDB para consultas: [Query Documents](https://www.mongodb.com/docs/manual/tutorial/query-documents/)

## Pré-requisitos

- Conta no MongoDB Atlas ativa.
- Mongo Compass instalado.
- Cluster `M0` criado.
- Usuário e acesso de rede configurados.

## Parte 1 - Carregar os sample databases (caso ainda não tenha)

1. No Atlas, abra um cluster qualquer.
2. Carregue os dados de exemplo. Procure essa opção ou similar a `Load Sample Datasets`.
3. Selecione todos os bancos de dados.
4. Aguarde o carregamento (pode levar de 5 a 10 minutos).
5. Confirme o aparecimento dos bancos de exemplo.

## Parte 2 - Banco `sample_mflix` (coleção `movies`)

Use este banco para praticar consultas iniciais.

### 2.1 Consultas básicas

1. Buscar todos os filmes do ano de `1999`.
2. Buscar filmes lançados depois de `2010`.
3. Buscar filmes lançados depois de `2010` com duração menor ou igual a `150` minutos.

### 2.2 Arrays e idioma

4. Buscar filmes que tenham idioma francês (mesmo que tenham outros idiomas).
5. Buscar filmes com idioma exatamente francês (apenas um idioma no array).
6. Buscar filmes que tenham exatamente 4 idiomas.

### 2.3 Análise de consulta inválida e correção

7. Explique por que a consulta abaixo é inválida e reescreva-a corretamente para retornar filmes com mais de 4 escritores:

```json
{ "writers": { "$size": { "$gt": 4 } } }
```

### 2.4 `$exists` e `$expr`

8. Monte uma consulta que:

- garanta que o campo `title` exista;
- filtre títulos com mais de 100 caracteres usando expressão.

Depois, interprete:
- o que a consulta retorna;
- o papel da condição de existência;
- o papel da expressão de tamanho.

### 2.5 Filtro combinado (adaptado)

9. Buscar filmes com nota IMDB maior ou igual a `5.5` e com pelo menos `4` prêmios.

## Parte 3 - Banco `sample_restaurants` (coleção `restaurants`)

### 3.1 Consultas de filtro

1. Buscar restaurantes do distrito (`borough`) `Brooklyn`.
2. Alterar para buscar restaurantes especializados em `Jewish/Kosher`.
3. Buscar restaurantes de cozinha judaica ou irlandesa, sem restringir distrito.
4. Buscar restaurantes de cozinha americana com algum `grades.score` maior que `60`.
5. Modificar a consulta anterior para ignorar o tipo de cozinha.

### 3.2 `regex` no campo `name`

6. Buscar restaurantes cujo nome comece com `Angel` (A maiúsculo).
7. Buscar restaurantes cujo nome termine com `0`.
8. Escrever e interpretar uma consulta com `AND` para retornar restaurantes de `Manhattan` com cozinha `Steak`.

## Parte 4 - Banco `sample_analytics`

### 4.1 Coleção `customers`

1. Buscar clientes com email do domínio Gmail.
2. Supondo que exista campo `createdAt`, buscar documentos criados a partir de uma data.
3. Considerando campo `birthdate`, buscar clientes nascidos após `1997-01-01`.

### 4.2 Coleção `accounts`

4. Buscar contas que contenham o produto `InvestmentStock`.

## Parte 5 - Banco `sample_airbnb` (coleção `listingsAndReviews`)

1. Buscar acomodações com preço entre `1000` e `2000`.
2. Buscar acomodações com `beds = 14` ou preço por noite maior que `20000`.
3. Consulta livre 1 (a critério do aluno).
4. Consulta livre 2 (a critério do aluno).
5. Consulta livre 3 (a critério do aluno).