## Como Executar o Projeto

### Pré-requisitos
- Docker instalado
- Docker Compose (opcional)

### Subindo a aplicação
Defina os valores em .env (ou copie o .env.example) em /backend/
Execute na raiz do projeto (/backend):

```bash
docker compose up --build -d
```

Caso utilize o Docker Compose clássico:

```bash
docker-compose up --build -d
```

---

### Reset do banco de dados PostgreSQL

Se houver erros relacionados ao banco ou alterações no `init.sql`, execute:

```bash
docker-compose down -v
```

Ele remove todos os volumes e reinicia o banco de dados do zero.

### Como acessar? 

Todas as aplicações irão rodar nas rotas determinadas por você em seu .env