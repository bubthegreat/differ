#############
### build ###
#############
# base image
FROM node:16-alpine AS build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH="/app/node_modules/.bin:$PATH"

# install and cache app dependencies
COPY package.json package-lock.json /app/
RUN npm ci --silent
RUN npm install -g @angular/cli@11.0.7

# add app
COPY . /app

# generate build for production
RUN ng build --configuration=production --output-path=dist

############
### prod ###
############

# base image
FROM nginx:alpine

# copy artifact build from the 'build environment'
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]