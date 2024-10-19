# Vinyl Box
Vinyl Box é um serviço de streaming de música com temática anos 60/70, oferecendo uma experiência nostálgica aos amantes da música clássica dessas décadas.

## Visão Geral
- Streaming de músicas dos anos 60/70
- Gerenciamento de playlists personalizadas
- Catálogo curado de artistas da época
- Interface com visual retrô

## Tecnologias Utilizadas
### Backend (Em construção)
- Node.js
- Express
- Prisma (ORM)
- PostgreSQL
- bcrypt
- JWT

### Frontend (Planejado)
- React
- TypeScript
- Zod

## Estrutura do Projeto
```
VINYL-BOX/
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.js
│
├── src/
│   ├── config/
│   │   └── prisma.js
│   │
│   ├── controllers/
│   │   ├── artistsControllers.js
│   │   ├── songsControllers.js
│   │   └── usersControllers.js
│   │
│   ├── middleware/
│   │   ├── authentication.js
│   │   ├── normalizeData.js
│   │   ├── upload.js
│   │   └── validate.js
│   │
│   ├── models/
│   │   ├── artistsModel.js
│   │   ├── songsModel.js
│   │   └── userModel.js
│   │
│   ├── routes/
│   │   └── routes.js
│   │
│   ├── schemas/
│   │   ├── artistSchema.js
│   │   ├── songSchema.js
│   │   └── userSchema.js
│   │
│   └── index.js
│
├── test/
│   └── unit/
│
└── public/
    └── uploads/
```

## Pré-requisitos
- Node.js
- npm ou yarn
- PostgreSQL

## Instalação e Execução
```bash
# Clone o repositório
git clone https://github.com/EdEddAEddy/vinyl-box.git

# Entre no diretório
cd vinyl-box

# Instale as dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env

# Configure o Prisma
npx prisma generate

# Execute as migrações
npx prisma migrate dev

# Inicie o servidor
npm run dev
```

## Configuração
Crie um arquivo `.env` com:
```
DATABASE_URL="postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>?schema=<SCHEMA>"
SECRET="secret"
```

## API Endpoints

### Usuários
- POST `/register` - Registro de usuário
- POST `/login` - Login de usuário
- GET `/user/me` - Dados do usuário atual
- PATCH `/user/me` - Atualizar perfil
- GET `/user/:user_id/playlists` - Listar playlists do usuário

### Artistas
- GET `/artists` - Listar artistas
- GET `/artists/:artist_id` - Detalhes do artista
- GET `/artists/:artist_id/songs` - Músicas do artista
- POST `/artist` - Cadastrar artista (Admin)
- PATCH `/artist/:artist_id` - Atualizar artista (Admin)

### Músicas
- GET `/songs` - Listar músicas
- GET `/songs/search` - Buscar músicas
- GET `/songs/:song_id` - Detalhes da música

## Próximos Passos
- Terminar o backend
- Implementação de funcionalidades de streaming
- Melhorias na segurança
- Início do desenvolvimento frontend

## Contato
- Nome: Edevando Alves
- LinkedIn: https://www.linkedin.com/in/edevando-alves/
- GitHub: @EdEddAEddy

Link do Projeto: https://github.com/EdEddAEddy/vinyl-box
