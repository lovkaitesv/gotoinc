# Test task for Gotoinc
## Todo api

### Installation

Note: project requires pre-installed Node.js

* Clone repository to your machine
* Go to repository folder `cd gotoinc`
* create `.env` file and configure variables
```
PORT="5000"  
DB_NAME="your db name"
DB_USER="By default is postgres"
DB_PASSWORD="use password"
DB_HOST="localhost"
DB_PORT=5432
ACCESS_SECRET=some-access-secret
REFRESH_SECRET=some-refresh-secret
```
Install dependencies
```
npm install
```
To run api in dev env run
```
npm run dev
```
To run api in production env run
```
npm run start
```
To run api tests
```
npm run test
```
To open api docs go to:
```
http://localhost:5000/api-docs
```