FROM node:16.15
WORKDIR /auth-service
COPY . .
RUN npm install -g typescript
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]