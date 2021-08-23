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

## Notes

### Different data fetching method

Before making two separate API calling functions in diffent components, I tried making a reusable hook (see ReadMe folder) - that would be utilisable by both the `Posts` and `Search` components. This proved to be more unwieldy than elegant, so I separated out the logic.

### Wrangling the graph data

Before settling on using React-D3-Graph I tried a few other libraries, and these were some of my workings for organising data in objects in different ways for the differing APIs.

```javascript
// Creating an object with tags as keys, and array of users (or string if single) as the value
const obj = {};
posts.forEach((post) => {
  let fullName;
  users.forEach((user, i) => {
    if (user.id === post.owner.id) {
      fullName = `${user.firstName} ${user.lastName}`;
    }
  });
  post.tags.forEach((t) => {
    if (Object.keys(obj).indexOf(t) === -1) {
      obj[t] = fullName;
    } else {
      obj[t] = [].concat.apply([], [fullName, obj[t]]);
    }
  });
});

/*
 * Turning the above into an array of objects. This was unnecessary
 * and over-complicating for formatting data for React-D3-Graph
 */

let arr = [];
const objectArray = Object.entries(obj);

objectArray.forEach(([key, value]) => {
  if (typeof value === Object) {
    value.forEach((v) => {
      arr.push({
        source: key,
        target: v,
      });
    });
  } else {
    arr.push({
      source: key,
      target: value,
    });
  }
});

// This method for getting a unique array of objects was favoured
let a = [];
posts.forEach((post) => {
  post.tags.forEach((tag) => {
    const fullName = `${post.owner.firstName} ${post.owner.lastName}`;
    a.push({
      source: tag,
      target: fullName,
    });
  });
});
a = [...new Set(a)];

var result = a.reduce((unique, o) => {
  if (
    !unique.some((obj) => obj.source === o.source && obj.target === o.target)
  ) {
    unique.push(o);
  }
  return unique;
}, []);
```

### Git history

I built the app using Vite, and on completion found adding polyfills to it problematic - so I ported it over to use Create React App for IE11 compatibility. The Git history, as a result doesn't show the build's progression.
