FROM node:14 as builder

WORKDIR /app

ARG GA_ID
ENV GA_ID $GA_ID

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN apt update
RUN apt install git
RUN apt install build-essential
# cache dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
RUN npm install -g serve
# copy application
COPY . .
RUN REACT_APP_GA_ID=$GA_ID yarn build

ENTRYPOINT [ "serve", "-s", "build" ]
# FROM nginx
# COPY --from=builder /app/build /usr/share/nginx/html
