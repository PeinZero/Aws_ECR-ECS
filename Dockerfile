FROM node:13.8.0-alpine

COPY dist dist/
COPY package.json .

ENV PORT 5000
EXPOSE 5000

CMD ["npm", "run", "production"]