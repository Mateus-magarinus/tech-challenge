# Tech-challenge-Mateus-Magarinus

## Comandos para executar localmente:
  #### Instala dependencias do projeto ( Node.js e NPM devem estar instalados )
  ```
    npm install
  ```
  #### Inicia conteiner com Redis ( Precisa possuir Docker instalado )
  ```
    docker-compose up
  ```
  #### Build e inicia o projecto
  ```
    npm run build && npm run start
  ```
    
  
## Rotas

- POST - /movies -> Busca por filmes;
  - Body: {"movieName": "movieName"}
- GET - /favorite -> Listar filmes favoritos;
- POST - /favorite -> Adicionar um filme aos favoritos;
  - Body: {"imdbID": "tt0386676"}
- DELETE - /favorite/:imdbID -> Remover um filme dos favoritos;

## Local CURLS

### /movies

```
curl --location --request POST 'localhost:8080/tech-challenge/movies' \
--header 'Content-Type: application/json' \
--data-raw '{
    "movieName": "The Office"
}'
```

### /favorite

```
curl --location --request POST 'localhost:8080/tech-challenge/favorite' \
--header 'Content-Type: application/json' \
--data-raw ' {"imdbID": "tt0386676"}'
```

### /favorite

```
curl --location --request GET 'localhost:8080/tech-challenge/favorite'
```

### /favorite/:imdbID

```
curl --location --request DELETE 'localhost:8080/tech-challenge/favorite/tt0386676'
```

## Heroku CURLS

### /movies

```
curl --location --request POST 'https://tech-challenge-node.herokuapp.com/tech-challenge/movies' \
--header 'Content-Type: application/json' \
--data-raw '{
    "movieName": "The Office"
}'
```

### /favorite

```
curl --location --request POST 'https://tech-challenge-node.herokuapp.com/tech-challenge/favorite' \
--header 'Content-Type: application/json' \
--data-raw ' {"imdbID": "tt0386676"}'
```

### /favorite

```
curl --location --request GET 'https://tech-challenge-node.herokuapp.com/tech-challenge/favorite'
```

### /favorite/:imdbID

```
curl --location --request DELETE 'https://tech-challenge-node.herokuapp.com/tech-challenge/favorite/tt0386676'
```
