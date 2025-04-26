set -e

echo "Iniciando processo de build e deploy..."

COMPOSE_FILE="docker-compose.yml"
ENV_FILE=".env"

if [[ ! -f "$COMPOSE_FILE" ]]; then
  echo "Arquivo $COMPOSE_FILE nao encontrado"
  exit 1
fi

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Arquivo $ENV_FILE nao encontrado"
  exit 1
fi

echo "Executando cocker compose..."
docker compose -f $COMPOSE_FILE --env-file $ENV_FILE up --build -d

echo "Deploy concluido com sucesso"