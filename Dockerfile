FROM node:14.17.1

COPY dist dist/
COPY package.json .

ENV PORT 5000
EXPOSE 5000

CMD ["npm", "run", "production"]