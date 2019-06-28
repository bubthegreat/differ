FROM node

WORKDIR /app-differ
ENV PATH /app-differ/node_modules/.bin:$PATH
COPY package.json /app-differ/package.json
RUN npm install
RUN npm install -g @angular/cli

COPY . .

EXPOSE 4200

CMD ng serve --host 0.0.0.0 --disableHostCheck