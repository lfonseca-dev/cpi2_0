# Imagem oficial do Node
FROM node:20

# Diretório dentro do container
WORKDIR /app

# Copia package.json primeiro (melhora cache)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o resto do projeto
COPY . .

# Expõe a porta da API
EXPOSE 3000

# Comando para iniciar
CMD ["npm", "start"]