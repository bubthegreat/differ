FROM node as app-differ-builder

WORKDIR /app-differ
ENV PATH /app-differ/node_modules/.bin:$PATH
COPY package.json /app-differ/package.json
RUN npm install
RUN npm install -g @angular/cli

COPY . .

RUN ng build --prod

FROM nginx

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=app-differ-builder /app-differ/dist/differ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
