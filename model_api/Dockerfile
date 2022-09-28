FROM node:16.15
WORKDIR /model_api
COPY . .
RUN npm install -g typescript
RUN npm install
EXPOSE 3003
CMD ["npm", "run", "build"]