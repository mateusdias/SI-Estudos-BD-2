# Lab 1 - Criando Conta no MongoDB Atlas

## Objetivo
Criar e configurar uma conta no MongoDB Atlas para uso nos próximos laboratórios.

## Resultado esperado

Ao final deste lab, o estudante deve:

- Ter uma conta ativa no MongoDB Atlas.
- Criar uma organização e um projeto.
- Provisionar um cluster `M0` (free tier).
- Criar um usuário de banco de dados.
- Configurar acesso de rede por IP.
- Testar a string de conexão.

## Conceitos antes de começar

- **Organização (Organization):** nível mais alto de agrupamento no Atlas.
- **Projeto (Project):** espaço lógico onde ficam clusters, usuários e configurações.
- **Cluster:** infraestrutura MongoDB gerenciada no Atlas.
- **Database User:** usuário que autentica no banco (não confundir com usuário da conta Atlas).
- **Network Access (IP Access List):** regra de quais IPs podem tentar conexão no cluster.

## Parte 1 - Criar conta no MongoDB Atlas

1. Acesse `https://www.mongodb.com/cloud/atlas/register`.
2. Crie sua conta com e-mail institucional (recomendado).
3. Faça validação de e-mail.
4. Conclua o onboarding inicial.

## Parte 2 - Criar organização e projeto

1. Crie ou selecione uma **Organization**.
2. Crie um **Project** para a disciplina (exemplo: `EBD2-2026`).
3. Use nomes padronizados para facilitar suporte em aula.

Sugestão de nome:

- Organização: `PUCC-EBD2`
- Projeto: `Turma-SI-EBD2-2026`

## Parte 3 - Criar cluster M0 (free tier)

1. Clique em `Build Cluster` ou `Create Cluster`.
2. Escolha a opção gratuita (`M0`).
3. Selecione provedor/região (preferencialmente mais próxima do Brasil).
4. Defina nome do cluster (exemplo: `cluster-ebd2`).
5. Aguarde o provisionamento.

Observação:

- O `M0` é suficiente para estudo e práticas iniciais.
- Em cenários de produção, normalmente usamos tiers dedicados (como `M10+`).

## Parte 4 - Criar usuário de banco (Database Access)

1. Vá em `Security` > `Database Access`.
2. Clique em `Add New Database User`.
3. Configure:
   - Método: `Password`
   - Username: exemplo `aluno_ebd2`
   - Password: senha forte (guardar com segurança)
   - Privilege: `Read and write to any database` (somente para laboratório inicial)
4. Salve o usuário.

Boas práticas:

- Nunca compartilhar senha em prints ou repositórios.
- Em ambiente real, aplicar princípio do menor privilégio.

## Parte 5 - Configurar segurança de rede (Network Access)

1. Vá em `Security` > `Network Access`.
2. Clique em `Add IP Address`.
3. Escolha uma das estratégias abaixo.

### Estratégia A (recomendada para segurança): IP específico

- Adicionar o IP público da sua máquina/rede atual.
- Vantagem: reduz superfície de ataque.
- Limitação: se o IP mudar, será necessário atualizar a lista.

### Estratégia B (laboratório rápido): Allow access from anywhere

- Regra `0.0.0.0/0` permite conexão de qualquer IP da internet.
- Vantagem: funciona rapidamente para testes em diferentes redes.
- Risco: aumenta muito a exposição do cluster a tentativas de acesso indevido.

Diretriz para esta disciplina:

- Pode usar `0.0.0.0/0` no início para evitar bloqueios de rede durante aula.
- Após validar conexão, preferir restringir para IP específico.
- Nunca usar `0.0.0.0/0` em produção.

## Parte 6 - Obter e testar string de conexão

1. No cluster, clique em `Connect`.
2. Escolha `MongoDB Compass`.
3. Copie a connection string.
4. Substitua `<username>` e `<password>`.
5. Abra o MongoDB Compass e cole a string em `New Connection`.
6. Clique em `Connect`.

Exemplo (modelo):

```txt
mongodb+srv://<username>:<password>@cluster-ebd2.xxxxx.mongodb.net/<database>?retryWrites=true&w=majority
```

## Checklist de validação

- Conta criada e validada.
- Projeto criado.
- Cluster `M0` ativo.
- Usuário de banco criado.
- IP adicionado em `Network Access`.
- Conexão testada com sucesso.

## Perguntas de reflexão

1. Qual a diferença entre usuário da conta Atlas e usuário de banco?
2. Por que `0.0.0.0/0` acelera o laboratório, mas é perigoso?
3. Em qual situação você migraria de `M0` para `M10+`?
