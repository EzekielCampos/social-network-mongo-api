
# Social Network API Using Mongoose

[![MIT License Badge](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](/LICENSE)
![Express Badge](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)


## Table of Contents
- [Description](#description)
<br/>
- [Installation](#installation)
<br/>
- [Usage](#usage)
<br/>
- [Contributing](#contributing)
<br/>
- [License](#license)
<br/>
- [Tests](#tests)
<br/>
- [Questions](#questions)
<br/>

## Description

This project focuses on creating an API for a social networking web application.  The backend was built with  MongoDB in association with Mongoose for creating models and organizing data.  Express was used to create the server and handle the different API routes.  This assignment was meant to create a functioning backend using Mongoose where users can create a friend’s list, and sharing and reacting to other user’s thoughts.  Mongoose’s intuitive and flexible ODM created an easy way to query and organize data from the database with all its built in methods and operators.  The option to either make a schema a subdocument or a model is a nice feature that can specify data and contain it in a model instead of creating a new one for each schema.  The most challenging part of this project was figuring out how to update all the collections if a document was either created or deleted from a different model since it won’t automatically update all the other collections.

## Installation

Before running this project make sure to have Node and MongoDb installed on your computer.  To download all the npm packages, type the command “npm i” in the terminal.  The two main packages that are heavily used are Mongoose to handle the query and creation of schemas from MongoDB, and Express which creates the server and handles the routes.

## Usage

There an option to seed the database by running the command “node seed” or “npm run seed”.  This will provide some starter data when hitting the API routes.  To start the server run the command “node server.js” or “npm run start”.  This will begin the server to begin, if it works then a message will be displayed in the terminal of which port to use.  Head over to an API development platform and begin hitting those routes! 
## Contributing

N/A
## License

This repository is covered under the MIT license

## Tests

N/A


## Questions

* GitHub Profile: [EzekielCampos](https://github.com/EzekielCampos)

If you have any additional questions contact me by email at ezcampos603@gmail.com

