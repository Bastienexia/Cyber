FROM node:16.15
WORKDIR /procede_api
COPY . .
RUN npm install -g typescript
RUN npm install
EXPOSE 3004
CMD ["npm", "run", "build"]