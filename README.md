# Project: Group 3

Bookaholic : Books at your fingertips is a web-based eBook store where users can search for books spanning a variety of categories and can read their favorites online in the embedded viewer or offline by downloading, as per their preferences. This repository contains the code for Bookaholic's frontend which is built with React.js.

This is the group project repository for the course CSCI 5709 - Advanced Topics in Web Development instructed by Professor Maria Gabriella Mosquera.

- _Date Created_: 27 Jan 2022
- _Last Modification Date_: 29 MAR 2022
- _Deployed Application URL_: <https://bookaholic-app.herokuapp.com>
- _Git Repository URL_: <https://git.cs.dal.ca/ygulati/group3_csci5709>

## Authors

- [Abhinav Rawat (B00895691)](mailto:abhi@dal.ca) - _(Maintainer)_
- [Jainam Rakeshkumar Shah (B00883898)](mailto:jainam@dal.ca) - _(Maintainer)_
- [Mitul Pravinbhai Malani (B00869519)](mailto:mt215690@dal.ca) - _(Maintainer)_
- [Ninad Nitin Shukla (B00863694)](mailto:nn320259@dal.ca) - _(Maintainer)_
- [Prit Thakkar (B00890731)](mailto:Prit.Thakkar@dal.ca) - _(Maintainer)_
- [Yashvi Gulati (B00900339)](mailto:ys849413@dal.ca) - _(Maintainer)_

## Getting Started

See the following section for detailed step-by-step instructions on how to run this project locally and See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To have a local copy of this tutorial up and running on your local machine, you will first need to install the following software

- [Node.js](https://nodejs.org/en/) - a JavaScript runtime (includes npm)
- [npm](https://docs.npmjs.com/about-npm) - a package manager for Node environment

### Installing

To get a development env running on local machine, run the following command in the project directory

Below command installs all the packages provided in package.json file into the folder called node_modules at the root of the project directory. You can see node_modules folder created at the root of the project directory when installation gets successful.

```
npm install
```

Below command runs the project in development mode. You can visit [http://localhost:3000](http://localhost:3000) to view it in your browser.

```
npm start
```

## Deployment

To deploy this project on heroku, Heroku CLI can be used.

Below command installs heroku globally into system.

```
npm install -g heroku
```

Use below command to login to your heroku account

```
heroku login
```

Below command creates a heroku app named heroku_app_name

```
heroku create <heroku_app_name>
```

Below command deploys main branch of project onto the heroku

```
git push heroku main
```

## Built With

- [React](https://reactjs.org/docs/getting-started.html) - A JS library for building UIs
- [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/) - A framework for building responsive, mobile-first sites
- [React bootstrap](https://react-bootstrap.github.io/getting-started/introduction) - The most popular front-end framework - Rebuilt for React.
- [React router dom](https://reactrouter.com/docs/en/v6/getting-started/installation) - A library for frontend routing for Single Page Application (SPA)
- [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js
- [React-pdf](https://www.npmjs.com/package/react-pdf) - Display PDFs in your React app as easily as if they were images
- [Font Awesome](https://fontawesome.com/v6/docs/web/use-with/react/) - An icon library and toolkit

## Acknowledgments

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
