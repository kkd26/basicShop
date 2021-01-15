# Basic Shop
Basic shop written in Express.js, Node.js and React.js.

For a normal user it will enable basic shopping. \
For an adming it has additional functionality like: `[product/category/group]` `[addition/edition/deletion]`


## Server in Express.js
- Connects to MongoDB and creates API for GET, POST, DELETE requests. The full documentation will be found under URL `<hostname>/api`
- Serves static folder `/dist` with HTML, JS, CSS, JPG, SVG files to `<hostname>`
- In order to start the server use `npm start` or `sudo npm start`
- The server source code is in the folder `/server`

## Front-end in React.js
- JS files are bundled up together thanks to Webpack and Babel.js.
- All the files are in the `/src` directory with the entry point to be `/src/index.js`.
- In development mode run `npm run build:dev` 
- For production run `npm run build`
- Webpack output files are stored in `/dist` directory which is then statically served by express.js server
- Remember to copy `manifest.json` and `.png` files from the `/public` to `/dist` folder 

## MongoDB
- In order to connect with MongoDB you have to create `/credentials.js` file with your password:
```node
const PASS = "<your password>";

exports.PASS = PASS;
```
- You can change DB url in `/routes/db.js` file
