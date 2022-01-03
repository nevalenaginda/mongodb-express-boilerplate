## Pre-requisites
You need to create a new DB with name `node-express` in your MongoDB with `courses` collection with at least 3 fields below:
```
{
    "_id": "5e451c512694a82900cb8c32",
    "name": "Computer & Science",
    "date": "2020-02-13T09:52:17.098Z"
}
```

## WHAT TO DO AFTER CLONE
1. `npm install`
2. `npm run start`
3. Open `localhost:3009` with available endpoints below:
* GET /api/courses
* GET /api/courses/:id
* POST /api/courses
* PATCH /api/courses/:id
* DELETE /api/courses/:id
