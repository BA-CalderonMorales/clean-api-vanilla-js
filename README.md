# Clean API Vanilla JS Test

A simple vanilla JavaScript project to test the `@ba-calderonmorales/clean-api` npm package.

## What We Did

- [x] Downloaded the package
- [x] Setup vanilla js example  
- [x] Ensure test pass and library can be downloaded and used

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the test:**
   ```bash
   npm test
   ```

## What This Demonstrates

This project shows how simple it is to use the `@ba-calderonmorales/clean-api` library:

```javascript
const { APIBase, APIError } = require('@ba-calderonmorales/clean-api');

// Define routes once
APIBase.addRoute('getAllPosts', 'https://jsonplaceholder.typicode.com/posts');
APIBase.addRoute('getPost', 'https://jsonplaceholder.typicode.com/posts/:id');

// Use them throughout your app
const response = await fetch(APIBase.getRoute('getAllPosts'));
```

## Files

- `api-test.js` - Main test file demonstrating the library usage
- `package.json` - Project dependencies and scripts
- `package-lock.json` - Locked dependency versions

## Test Results

The test validates:
- ✅ GET requests
- ✅ POST requests  
- ✅ PUT requests
- ✅ DELETE requests
- ✅ Route management with parameters
- ✅ Error handling

All tests pass successfully, confirming the library works as expected!