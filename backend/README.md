## Como Executar o Projeto

### Pré-requisitos
- Docker instalado
- Docker Compose (opcional)

### Subindo a aplicação
Defina os valores em .env (ou copie do .env.example) em /backend
Execute na raiz do projeto (/backend):

PARA DESENVOLVIMENTO:
```bash
docker compose --env-file .env up --build -d
```

PARA PRODUÇÃO
```bash
docker compose -f docker-compose.yml --env-file .env up --build -d
```

---

### Reset do banco de dados PostgreSQL, MongoDB e RabbitMQ

Se houver erros relacionados ao banco ou alterações no `init.sql`, execute:

```bash
docker-compose down -v
```

Ele remove todos os volumes e reinicia o banco de dados do zero.

### Como acessar? 

Todas as aplicações irão rodar nas rotas determinadas por você em seu .env