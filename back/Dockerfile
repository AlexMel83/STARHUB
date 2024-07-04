FROM node:22.2-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production --silent --loglevel=error 2>/dev/null
COPY . .
CMD ["npm", "start"]