FROM node:16.15
WORKDIR /authentification_api
COPY . .
RUN npm install -g typescript
RUN npm install
EXPOSE 3001
CMD ["npm", "run", "build"]