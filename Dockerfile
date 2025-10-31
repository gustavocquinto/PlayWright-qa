FROM mcr.microsoft.com/playwright:v1.56.0-jammy 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npx", "playwright", "test"]