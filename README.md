# Dummy-Api

## Getting started

To get it going, first rename `.env.example` to `.env` and inside the file replace `00000000000000000` with a valid api key for [http://dummyapi.io](http://dummyapi.io):

Then run:

### `npm install`

To install dependencies. Then:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## Features

The app consists of three sections:

1. Latest posts feed, with pagination and next page pre-fetch
2. Post search engine which filters by poster's name, post text and tags
3. Network graph of the relationship between posts and tags from posts shown on the selected page of the latest post section
