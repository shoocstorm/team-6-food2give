Telegram bot : t.me/foodheroms_bot

# FRONTEND

```
set REACT_APP_SERVER_URL=http://localhost:5001 # url of backend service, alternatively can put this into a .env file where "npm start" can leverage
cd my-app-fe
npm install
npm start

```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

---

# BACKEND

1. Create a virtual environment `python -m venv venv`
2. go to `my-app-be`
3. `pip install -r requirements.txt`
4. set `my-app-be/settings.json` to the file vanessa sent in the chat (alternatively generate your own `settings.json` by creating a new public key in firebase console)
5. create a .env file and place the environment variables sent in `team6` chat
6. run `dotenv run -- python manage.py`

To run the server, use locally run server and generate a key from the firebase and get the `settings.json` or contact our member for the .env and settings.json file
1. Go to project settings in Firebase and generate the settings.json

Deployed server: the server is deployed using Docker and to the google cloud. Can run `docker build` and `docker run` 



# Deploy UI (static files) to firebase
```
npm run build

rename "build" folder to "deploy"

firebase init

firebase deploy
```
