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


### Category Route

`GET /v1/category` - returns all categories --> DONE

`GET /v1/category/id/:id` - return specific category based on Id --> DONE

`GET /v1/category/name/:name` - return specific category based on name --> DONE

`POST /v1/category/` - create a new category with the provided data --> DONE

`PUT /v1/category/id/:id` - update the category if present, if not return category not present. --> DONE

`DELETE /v1/category/id/:id` - delete an existing category based on Id --> DONE


### Debit Route

`GET /v1/debit/` - returns all debit transactions. --> DONE

`GET /v1/debit/id/:id` - return specific category based on Id --> DONE

`GET /v1/debit/userid/:userid` - returns all debit transactions based on user-id. --> DONE

`GET /v1/debit/categoryid/:categoryid` - returns all debit transactions based on category-id. --> DONE

`GET /v1/debit/date/:date` - returns all the debit transactions with the specified date. --> DONE

`POST /v1/debit/` -  create a new debit transaction with the provided data --> done

`PUT /v1/debit/id/:id` - update the debit transaction if present, if not return debit transaction not present. --> DONE

`DELETE /v1/debit/id/:id` - delete an existing debit transaction based on Id 
