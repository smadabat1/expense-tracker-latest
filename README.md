# expense-tracker-latest
Expense tracker using React.JS, Bun.JS, PostgreSQL

## Backend - Bun.js
- Installed Bun.js

bun init

bun run index.ts


### User Route

`GET /v1/user` - returns all users. --> DONE

`GET /v1/user/id/:id` - return specific user based on ID. --> DONE

`GET /v1/user/username/:username` - return specific user based on username. --> DONE

`POST /v1/user/` - create a new user with the provided data. 
- TODO Need to handle the following errors from DB - "duplicate key value violates unique constraint users_username_key"
- TODO Need to add data validation helper function.

`PUT /v1/user/id/:id` - update an existing user if present, if not return user not found.  --> DONE

`DELETE /v1/user/id/:id` - delete an existing user based on ID. --> DONE
- TODO - in UI we need to check if the rowCount is 0 if so then the account is already deleted. 



