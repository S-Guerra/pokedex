FROM node:22-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy all backend source files
COPY . .

EXPOSE 3001

CMD ["node", "server.js"]
