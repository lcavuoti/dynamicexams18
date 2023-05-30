# pull official base image
FROM node:20-alpine3.16
# add a bash shell to the image
#RUN apk add --no-cache bash
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
RUN echo "Path: $PATH"
# install app dependencies
COPY package.json ./
#COPY package-lock.json ./
RUN npm install 
RUN npm install -g npm@9.6.6
#RUN npm install react-scripts@5.0.1 -g --silent
#RUN yarn
# add All to app
COPY . ./

# start app
#CMD ["npm", "start"]
# Best-Practice with ENTRYPOINT!
#ENTRYPOINT ["yarn", "start"]
ENTRYPOINT ["npm", "start"]
