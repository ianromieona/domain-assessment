# Technical Challenge: Note-Taking App

## Tech Stack

Client.

-   ReactJS
-   Typescript
-   TailwindCSS
-   Zustand

Server

-   ExpressJS
-   Typescript
-   Firebase
-   Jest

## Installation

Note App requires [Node.js](https://nodejs.org/) v23.6.1 to run.

Install the dependencies and devDependencies and start the server of the client.

```sh
cd client
npm install
npm run start
```

Install the dependencies and devDependencies and start the server of the server.

Copy `.env` file to server folder, Kindly look for the `.env` file I sent over the email. (Firebase detects and disables the db account if happened found publicly)

```sh
cd server
npm install
npm run dev
```

## Development

Open this link on the browser if not automatically opened:

```
http://localhost:3000
```

## Test

To test server note api endpoints

```
cd server
npm test
```

### Notes

-   Selected **Firebase** as the db for faster implementation, simple note app dont have complex queries and flexible structure
-   Selected **Zustand** for the storage / action management
