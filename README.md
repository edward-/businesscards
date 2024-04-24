# Business Cards Project

Backend Application for professional business cards, developed in NodeJS with GraphQL and MongoDB.

## How to Start
### Prerequisites
- Node 20.12.2 or higher installed on your machine.

### Setup
```bash
git clone https://github.com/edward-/businesscards.git
cd businesscards
```

Create a MongoDB account on [MongoDB](https://www.mongodb.com/) or connect to your local database. Then, obtain the credentials to place them in your nodemon.json file.

```bash
touch nodemon.json
```

Edit file to copy and paste:
```json
{
  "env":{
    "mongoDatabase": "test",
    "mongoUserName": "test",
    "mongoUserPassword": "test"
  }
}
```

### Run

```bash
sudo npm i --force
```

install nodemon:
```bash
sudo npm i nodemon --force
```

run:
```bash
nodemon app
```

Now, you can access to http://localhost:4000/cards


## Stack Tech Used

- Programming Language: NodeJS - Chosen for its practicality and support of GraphQL frameworks and libraries.

## Docs&Tech
- [node](https://nodejs.org/en)
- [graphql](https://graphql.org/)
- [graphql course](https://www.udemy.com/course/amazon-aws-cloud-computing-course)
- [mongodb](https://www.mongodb.com/)

## TODO
- [ ] Implement integration tests

## Contributing
We welcome contributions of all kinds from the community! If you're interested in making Business Cards Project even better, feel free to fork the repository, make your changes, and submit a pull request. For more details, check out our CONTRIBUTING.md file (to be created).

License
Business Cards Project is released under the MIT License. See the LICENSE file in the repository for more details.