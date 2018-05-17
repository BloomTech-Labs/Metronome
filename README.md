# CS5 Lab Project Metronome

Metronome is designed for musical school system that allows instructors to give assignments and to track the history of assignments given and those who are given the assignments. On the other hand, students are able to check out instructions of the assignments and what assignments they are given.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

[NodeJS](https://nodejs.org/en/) (tested with version 9.3.0)  
[Yarn](https://yarnpkg.com) (tested with version 1.6.0)  
[MongoDB](https://mongodb.com) (tested with version 3.6.0)

### Installing

Before running the server, you will need to copy the `.env.example` file to a `.env` file with your actual secret keys.
You will also need an instance of MongoDB running locally to run the unit tests (and if your MONGODB_URI key points to a local MongoDB server).  

Dependencies are installed by running `yarn` in both the root directory and the front-end directory.
To run the application locally, run `yarn start` in the root directory and `yarn start` in the front-end directory from a different terminal.

Once the create-react-app development server has started up, you should be able to view the site at `localhost:3000` in your browser.  

Note: the server must be running for the front-end to function properly, as the API requests are proxied to the server at `localhost:8000`.

## Running the tests

To run the unit tests, simply run `yarn test` in the root directory. 
Make sure that your local server is running before executing the tests.

### Coding Style

This application uses the airbnb eslint file as a base for linting rules. We have added a few of our own linting rules along the way to fit our own development styles.  
The linting rules can be viewed and modified in the `eslintrc.json` file. 

## Deployment

Deployment is as simple as running `heroku create` and `git push heroku master` (see https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction for more details on deploying a Node.JS app to heroku).  
Don't forget to set your secret keys in your heroku dashboard!

## API 

API documentation can be viewed by cloning/forking the project and opening `apidoc/index.html` in your preferred browser. Documentation is created with [apiDoc](http://apidocjs.com/). To update the API documentation after adding in your own apiDoc comments, run `yarn build-docs` in your terminal.
## Built With

* [NodeJS](https://nodejs.org/en/)
* [ExpressJS](https://expressjs.com/)
* [ReactJS](https://reactjs.org/)
* [MongoDB](https://www.mongodb.com/)

## Authors

* **Adam Fetters** - [Github](https://github.com/adamfetters)
* **Emma Drueke** - [Github](https://github.com/emmadrueke)
* **Jesse Hood** - [Github](https://github.com/jessehood)
* **Ting Wang** - [Github](https://github.com/nunulong)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [Lambda School - A school that invests in you](https://lambdaschool.com/)