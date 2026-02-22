# Experimento 01 - Entendento JSON

## Objetivo
Compreender o que é JSON, como documentos são estruturados e quais tipos de dados são suportados.

## O que é JSON

**JSON (JavaScript Object Notation)** é um formato textual para troca e representação de dados.
Ele é leve, legível e muito usado em APIs, aplicações web e bancos orientados a documentos.

No JSON, os dados são organizados principalmente em:

- **Objeto (`{}`):** conjunto de pares `chave: valor`.
- **Array (`[]`):** lista ordenada de valores.

## Estrutura básica de um documento JSON

```json
{
  "nome": "João",
  "idade": 21,
  "solteiro": true
}
```

- As chaves ficam entre aspas duplas.
- Cada chave aponta para um valor.
- Valores podem ser de tipos diferentes.

## Exemplo 1: documento de veículo

```json
{
  "placa": "BRA2E19",
  "marca": "Toyota",
  "modelo": "Hilux",
  "ano": 2022,
  "quilometragem": 45210.5,
  "revisado": true,
  "acessorios": ["airbag", "abs", "camera de re"],
  "proprietario": {
    "nome": "Julia",
    "cpf": "123.456.789-00"
  }
}
```

Esse exemplo mostra:

- Campos simples (`placa`, `modelo`, `ano`).
- Número inteiro e decimal (`ano`, `quilometragem`).
- Booleano (`revisado`).
- Array (`acessorios`) com `[]`.
- Objeto aninhado (`proprietario`) com `{}`.

## Exemplo 2: array de alunos (atenção ao `[]`)

Quando queremos representar uma lista, usamos colchetes `[]`.

```json
[
  {
    "ra": "2026001",
    "nome": "Ana Souza",
    "nota": 8.7,
    "aprovado": true
  },
  {
    "ra": "2026002",
    "nome": "Bruno Lima",
    "nota": 6.4,
    "aprovado": true
  },
  {
    "ra": "2026003",
    "nome": "Carla Mota",
    "nota": 4.9,
    "aprovado": false
  }
]
```

- [] indica uma lista (em muitas linguagens também chamada de array). Para quem vem de C, pense em uma sequência indexada de elementos.
- Cada item da lista pode ser um objeto completo.
- Isso é muito comum para coleções de registros.

## Tipos suportados no padrão JSON

O padrão JSON suporta os seguintes tipos:

- **string** (texto): `"MongoDB"`
- **number** (número): `10`, `3.14`, `-7`
- **object** (objeto): `{ "chave": "valor" }`
- **array** (lista): `[1, 2, 3]`
- **boolean** (lógico): `true` ou `false`
- **null** (nulo): `null`

## Ponto importante sobre datas

No JSON puro, **não existe tipo nativo de data**.
Datas normalmente são representadas como string, por exemplo em formato ISO 8601:

```json
{
  "dataCadastro": "2026-02-21T10:30:00Z"
}
```

Exemplo com horário local em GMT-3:

```json
{
  "localTime": "2026-02-21T07:30:00-03:00"
}
```

Em MongoDB, embora você escreva JSON/Extended JSON, internamente o banco trabalha com BSON, que possui tipo de data próprio.

## Exercício rápido

1. Crie um JSON de um produto com pelo menos 8 campos.
2. Inclua:
   - 1 objeto aninhado
   - 1 array com no mínimo 3 elementos
   - 1 valor booleano
   - 1 campo de data em string ISO 8601
3. Valide se seu JSON está sintaticamente correto (chaves, vírgulas e aspas).
