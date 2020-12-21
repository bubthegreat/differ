FROM node as app-differ-builder

WORKDIR /app-differ
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json .
RUN npm install

# COPY package.json /app-differ/package.json
RUN npm install -g @angular/cli
RUN npm install @angular-devkit/build-angular

COPY . .

RUN ng build --prod

FROM nginx:1.19.3-alpine

# From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=app-differ-builder /app-differ/dist/app-differ /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
