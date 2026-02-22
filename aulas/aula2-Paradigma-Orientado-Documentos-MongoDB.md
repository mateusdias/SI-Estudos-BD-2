# Aula 2 - Paradigma Orientado a Documentos no MongoDB

## Objetivo
Compreender o paradigma orientado a documentos no MongoDB, diferenciando-o do modelo relacional e aplicando princípios de modelagem para coleções e documentos.

## O que é o paradigma orientado a documentos

No paradigma orientado a documentos, os dados são armazenados em **documentos** (formato BSON/JSON), organizados em **coleções**.

Cada documento representa uma entidade de negócio com estrutura flexível, permitindo variação de campos entre registros da mesma coleção quando isso fizer sentido para o domínio.

## Conceitos fundamentais

- **Documento:** unidade básica de dados no MongoDB (similar a um registro de tabela no BD relacional, mas com estrutura rica e aninhada). Por hora, pense dessa maneira. 
- **Coleção:** conjunto de documentos (similar a uma tabela, porém sem esquema rígido obrigatório).
- **Campo:** atributo de um documento (equivalente a coluna no relacional).
- **_id:** identificador único obrigatório de cada documento.
- **BSON:** formato binário estendido do JSON, usado internamente pelo MongoDB. Escrevemos e visualizamos documentos em JSON (ou Extended JSON), mas o MongoDB serializa e processa esses dados em BSON.

## Relacional x Documentos (visão prática)

- **Modelo relacional:** tende a normalização, múltiplas tabelas e joins.
- **Modelo de documentos:** favorece a agregação/composição de dados relacionados em um único documento para reduzir a necessidade de joins. A ideia é modelar documentos mais completos, orientados aos padrões de acesso da aplicação, em vez de depender principalmente de operações de álgebra relacional.
- **Consistência de estrutura:** relacional é estrito por schema; MongoDB pode ser flexível (ou controlado via validação).
- **Escalabilidade:** MongoDB foi projetado para escalar horizontalmente (espalhar os documentos numa estrutura horizontal = vários clustes e vários computadores para aumentar o desempenho), com mais naturalidade em cenários distribuídos.

## Exemplo de modelagem

### Cenário: pedidos de e-commerce

No modelo relacional tradicional:
- Tabela `clientes`
- Tabela `pedidos`
- Tabela `itens_pedido`

No modelo orientado a documentos, um pedido pode concentrar dados relevantes no mesmo documento:

```json
{
  "_id": { "$_oid" : "id do mongo"},
  "cliente": {
    "id": "CLI10",
    "nome": "Ana Souza"
  },
  "itens": [
    { "produto": "Mouse", "quantidade": 1, "preco": 120.0 },
    { "produto": "Teclado", "quantidade": 1, "preco": 250.0 }
  ],
  "status": "pago",
  "total": 370.0,
  "criadoEm": "2026-02-21T10:00:00Z"
}
```

Vantagem prática: leitura do pedido completo em uma única consulta = performance.

## Estratégias de modelagem: embed vs reference

### Embed (documento embutido)

- Dados relacionados ficam dentro do mesmo documento.
- Melhor para leitura frequente conjunta.
- Exemplo: endereço do cliente dentro do documento do cliente.

### Reference (referência entre documentos)

- Dados ficam em coleções diferentes, ligados por identificadores.
- Melhor quando há alto reuso, crescimento sem limite ou atualização independente.
- Exemplo: catálogo de produtos em coleção separada, referenciado em pedidos.

## Quando usar cada estratégia

- Use **embed** quando os dados "nascem e morrem juntos" e o acesso conjunto é dominante.
- Use **reference** quando os dados têm ciclo de vida próprio, são muito grandes ou compartilhados por muitos documentos.
- Em projetos reais, é comum um modelo **híbrido** (parte embutida, parte referenciada).

## Boas práticas iniciais no MongoDB

- Modelar com base nos **padrões de consulta** da aplicação.
- Evitar replicar dados sem critério claro de leitura/performance.
- Definir convenções de nomes de campos e coleções.
- Criar índices conforme consultas críticas (tema aprofundado em aulas futuras).
- Controlar qualidade de dados com validação de schema quando necessário.

## Erros comuns de iniciantes

- Tentar copiar o modelo relacional 1:1 no MongoDB.
- Criar referências em excesso e perder a vantagem do modelo documental.
- Embutir dados ilimitados sem considerar crescimento do documento.
- Ignorar padrões de consulta ao modelar.

## Resumo da aula

- MongoDB usa documentos e coleções com schema flexível.
- O foco da modelagem é o acesso da aplicação aos dados.
- A decisão entre **embed** e **reference** é central no paradigma orientado a documentos.
- Não existe modelagem única: o melhor desenho depende de contexto e carga de uso.

## Atividade de fixação

(antes de prosseguir, leia e faça o Experimento 1 - Entendendo JSON).

1. Escolha um sistema simples (biblioteca, clínica, e-commerce ou escola).
2. Modele 2 coleções principais.
3. Para cada coleção, defina:
   - Campos obrigatórios
   - Campos opcionais
   - Onde usar embed e onde usar referência