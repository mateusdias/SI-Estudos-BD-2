# Lab 2 - Criando Colecoes e Documentos

## Objetivo
Praticar a criacao de bancos, colecoes e documentos no MongoDB, aplicando diferentes tipos de dados JSON/BSON em cenarios reais.

## Resultado esperado
Ao final do laboratorio, o estudante deve conseguir:

- Criar 3 bancos de dados com temas diferentes.
- Criar colecoes em cada banco.
- Inserir documentos com tipos variados (string, number, boolean, array, object, null, data).
- Executar consultas basicas para validar insercoes.

## Pre-requisitos

- Conta no MongoDB Atlas criada.
- Cluster `M0` ativo.
- Usuario de banco configurado.
- IP liberado no `Network Access`.
- Acesso ao `MongoDB Compass`.

## Tema dos 3 bancos deste roteiro

1. `escola_db`
2. `concessionaria_db`
3. `clinica_db`

## Roteiro de execucao

## Parte 1 - Conectar no cluster

1. Abra o `MongoDB Compass`.
2. Conecte usando a sua connection string.
3. Confirme que a conexao foi estabelecida com sucesso.

## Parte 1.1 - Como criar banco e colecao no Compass

Use este mesmo procedimento sempre que o roteiro pedir para criar bancos e colecoes:

1. Clique em `+ Create Database`.
2. Em `Database Name`, informe o nome do banco (ex.: `escola_db`).
3. Em `Collection Name`, informe a primeira colecao (ex.: `alunos`).
4. Clique em `Create Database`.
5. Para criar as demais colecoes do mesmo banco, abra o banco e clique em `Create Collection`.

## Parte 2 - Banco 1: Escola

### 2.1 Criar banco e colecoes

Crie o banco `escola_db` e as colecoes:

- `alunos`
- `disciplinas`
- `matriculas`

No Compass:
- Crie o banco com a colecao inicial `alunos`.
- Depois crie `disciplinas` e `matriculas` via `Create Collection`.

### 2.2 Inserir documentos

No Compass, para cada documento:

1. Abra a colecao.
2. Clique em `Add Data` > `Insert Document`.
3. Cole o JSON.
4. Clique em `Insert`.

#### Colecao `alunos`

```json
{
  "ra": "2026001",
  "nome": "Ana Souza",
  "idade": 20,
  "ativo": true,
  "contatos": ["11999990001", "ana@email.com"],
  "endereco": {
    "cidade": "Campinas",
    "estado": "SP"
  },
  "bolsista": null,
  "dataCadastro": { "$date": "2026-02-21T10:00:00Z" }
}
```

```json
{
  "ra": "2026002",
  "nome": "Bruno Lima",
  "idade": 22,
  "ativo": true,
  "contatos": ["11999990002"],
  "endereco": {
    "cidade": "Valinhos",
    "estado": "SP"
  },
  "bolsista": true,
  "dataCadastro": { "$date": "2026-02-21T10:05:00Z" }
}
```

#### Colecao `disciplinas`

```json
{
  "codigo": "EBD2",
  "nome": "Estudos de Banco de Dados II",
  "cargaHoraria": 80,
  "ementaResumida": "NoSQL, modelagem e aplicacoes",
  "ativa": true
}
```

#### Colecao `matriculas`

```json
{
  "raAluno": "2026001",
  "codigoDisciplina": "EBD2",
  "semestre": "2026-1",
  "notaParcial": 8.7,
  "frequencia": 92.5,
  "situacao": "cursando"
}
```

## Parte 3 - Banco 2: Concessionaria

### 3.1 Criar banco e colecoes

Crie o banco `concessionaria_db` e as colecoes:

- `veiculos`
- `clientes`
- `vendas`

No Compass:
- Crie o banco com a colecao inicial `veiculos`.
- Depois crie `clientes` e `vendas`.

### 3.2 Inserir documentos

#### Colecao `veiculos`

```json
{
  "placa": "BRA2E19",
  "modelo": "Corolla",
  "ano": 2022,
  "quilometragem": 45210.5,
  "itens": ["airbag", "abs", "camera de re"],
  "disponivel": true,
  "preco": 119900.0,
  "revisoes": [
    { "data": { "$date": "2025-05-10T00:00:00Z" }, "descricao": "troca de oleo" },
    { "data": { "$date": "2025-11-22T00:00:00Z" }, "descricao": "alinhamento" }
  ]
}
```

#### Colecao `clientes`

```json
{
  "cpf": "12345678900",
  "nome": "Mariana Lima",
  "telefone": "11988887777",
  "email": "mariana@email.com",
  "interesses": ["sedan", "automatico"],
  "limiteFinanciamento": 150000,
  "ativo": true
}
```

#### Colecao `vendas`

```json
{
  "placaVeiculo": "BRA2E19",
  "cpfCliente": "12345678900",
  "valorFinal": 117500.0,
  "formaPagamento": "financiamento",
  "entrada": 30000,
  "parcelas": 36,
  "seguroIncluido": false,
  "dataVenda": { "$date": "2026-02-21T15:30:00Z" }
}
```

## Parte 4 - Banco 3: Clinica

### 4.1 Criar banco e colecoes

Crie o banco `clinica_db` e as colecoes:

- `pacientes`
- `medicos`
- `consultas`

No Compass:
- Crie o banco com a colecao inicial `pacientes`.
- Depois crie `medicos` e `consultas`.

### 4.2 Inserir documentos

#### Colecao `pacientes`

```json
{
  "cpf": "98765432100",
  "nome": "Carlos Pereira",
  "idade": 41,
  "planoSaude": "Plano Mais",
  "alergias": ["dipirona"],
  "contatoEmergencia": {
    "nome": "Lucia Pereira",
    "telefone": "11977776666"
  },
  "fumante": false
}
```

#### Colecao `medicos`

```json
{
  "crm": "CRM-SP-123456",
  "nome": "Dra. Paula Mendes",
  "especialidade": "Cardiologia",
  "salasAtendimento": [101, 102],
  "plantonista": true
}
```

#### Colecao `consultas`

```json
{
  "cpfPaciente": "98765432100",
  "crmMedico": "CRM-SP-123456",
  "dataConsulta": { "$date": "2026-03-02T14:00:00Z" },
  "sintomas": ["cansaco", "dor no peito"],
  "pressao": {
    "sistolica": 13,
    "diastolica": 8
  },
  "retorno": true,
  "observacoes": null
}
```

## Parte 5 - Validacao com consultas basicas

Execute consultas em cada banco para validar os dados.

### Exemplos de validacao

- Buscar todos os alunos:
  - Abra `escola_db > alunos`.
  - Em `Filter`, use: `{}`

- Buscar veiculos disponiveis:
  - Abra `concessionaria_db > veiculos`.
  - Em `Filter`, use: `{ "disponivel": true }`

- Buscar consultas com retorno:
  - Abra `clinica_db > consultas`.
  - Em `Filter`, use: `{ "retorno": true }`

## Parte 6 - Desafio extra (obrigatorio)

No banco `escola_db`, insira 2 novos alunos e depois:

1. Liste apenas nome e idade de todos os alunos.
2. Busque alunos com idade maior que 21 (filtro: `{ "idade": { "$gt": 21 } }`).
3. Conte quantos alunos estao ativos.

## Checklist de entrega

- Criou os 3 bancos (`escola_db`, `concessionaria_db`, `clinica_db`).
- Criou 3 colecoes em cada banco.
- Inseriu os documentos do roteiro.
- Executou consultas basicas de validacao.
- Fez o desafio extra.

## Evidencias para entrega

- Print do Atlas/Compass mostrando os 3 bancos criados.
- Print de pelo menos 1 colecao por banco.
- Print de 3 consultas executadas com resultado.
