# Graphql-Project

its a user todo list project with authentication which i s built with nodejs-express, graphqls-apollo, Mongodb

#to get started

npm run dev

goto localhost:3001/graphql

first u need to run signUp and login mutation to access all the other queries and mutation

signup Query --

mutation {
signUp(
input: { name: "demo name", email: "demoemail", password: "12345" }
) {
id
name
email
updatedAt
createdAt
}
}

login Query --

sign up email and password
mutation {
login(input: { email: "demo email", password: "12345" }) {
token
}
}

then need pass the HTTP header for acces all the query

token u will get from login
{
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbXVuQGdtYWlsLmNvbSIsImlhdCI6MTU5MjEzNjkyMiwiZXhwIjoxNTkyMjIzMzIyfQ.eXJbH5ZYuM5I38c2un4yDsuoEuEmsaa9rycqHSQJxwY"
}

now expolre all the queries and mutations
