FROM node:16.15
WORKDIR /ingredient_api
COPY . .
RUN npm install -g typescript
RUN npm install
EXPOSE 3002
CMD ["npm", "run", "build"]