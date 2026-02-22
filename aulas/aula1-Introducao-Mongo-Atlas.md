# Aula 1 - Introducao ao MongoDB Atlas

## Objetivo
Apresentar os conceitos iniciais do MongoDB Atlas e preparar o ambiente para as próximas aulas.

## Definição de cluster no MongoDB Atlas

No MongoDB Atlas, um **cluster** é um conjunto de recursos (servidores, armazenamento e configurações) que executa o banco de dados MongoDB. Em ambientes de produção, esse cluster normalmente roda como um **replica set**.

### Componentes de um replica set

- **Node primário (Primary):** recebe operações de escrita e leitura (quando configurado para isso) e replica as mudanças para os secundários.
- **Node secundário 1 (Secondary):** mantém uma cópia dos dados do primário por replicação assíncrona.
- **Node secundário 2 (Secondary):** mesma função do secundário 1, ajudando em alta disponibilidade e tolerância a falhas.

### Como funciona o failover

Quando o node primário para (falha de máquina, rede ou manutenção), ocorre o processo de **failover**:

1. Os secundários detectam que o primário ficou indisponível.
2. O replica set inicia uma eleição automática.
3. Um dos secundários é promovido a novo primário.
4. As aplicações se reconectam e continuam operando no novo primário.

Esse processo reduz indisponibilidade e evita ponto único de falha.

## Arquiteturas de replica set e especificidades

Nem todo replica set tem a mesma composição. As arquiteturas mais comuns para discussão didática são:

### PSS (Primary + Secondary + Secondary)

- Possui **3 nós com dados**.
- Os 3 nós podem votar na eleição.
- Em caso de falha do primário, um secundário pode ser eleito.
- Maior robustez de dados, porque há duas cópias secundárias.
- Não usa um nodo como árbitro para decidir quem tem mais "saúde" para assumir, usa algoritmo de consenso computacional. 

### PSA (Primary + Secondary + Arbiter)

- Possui **2 nós com dados** e **1 árbitro (arbiter)**.
- O árbitro **não armazena dados** e **não vira primário**.
- A função do árbitro é participar da votação para evitar empate.
- Custo de infraestrutura menor que PSS, mas com menor redundância de dados.

### Papel do árbitro no failover

- O árbitro existe para **quórum de eleição**, não para armazenar carga de dados.
- Em arquiteturas sem árbitro (como PSS), o failover continua funcionando normalmente, desde que haja maioria de votos disponível.
- Em arquiteturas com árbitro (PSA), ele ajuda a destravar a eleição quando apenas dois nós de dados poderiam empatar.

### Resumo prático

- Se o foco é **alta disponibilidade com melhor redundância**, prefira **PSS**.
- Se o foco é **redução de custo com quórum mínimo**, pode ser usado o modelo **PSA** com a ressalva de risco maior para dados em falhas combinadas. Atualmente o Mongo Atlas, ao criar um cluster do tipo replica set, já usa o modelo PSS por padrão. 

## Camadas de clusters (tiers) no modelo replica set

No Atlas, as **camadas de cluster** (tiers) definem capacidade de CPU, memória, armazenamento, limites operacionais e recursos disponíveis.

### Exemplo de camadas

- **M0 (Free Tier):** camada gratuita para estudo, testes e protótipos simples (Usaremos esse modelo em grande parte do curso). 

- **M10 (Dedicated):** tipo de cluster pago, de entrada para produção, com recursos dedicados e mais controle operacional. 

### Diferenças práticas entre M0 e M10

- **Custo:** M0 é gratuito; M10 é pago.
- **Recursos de hardware:** M0 usa recursos compartilhados; M10 usa recursos dedicados (mínimos, mas dedicados - isso já denota uma grande diferença de performance mesmo com pouco armazenamento).
- **Escalabilidade e desempenho:** M10 oferece mais previsibilidade e melhor performance para carga real.
- **Operação em produção:** M0 é recomendado para aprendizagem; M10 já atende cenários iniciais de produção.
- **Recursos avançados:** M10 habilita mais opções de configuração, monitoramento e segurança que o nível gratuito.

### Como escolher uma camada

- Exercitaremos em aulas futuras cases de decisão de arquitetura para compreender como dimensionar corretamente a infraestrutura de armazenamento do Mongo Atlas. 
