# Questioner
A Full stack application that Crowd-source questions for a meetup. ​Questioner​​ helps the meetup organizer prioritize  questions to be answered. 

[![Build Status](https://travis-ci.com/Amriesgrace/Questioner.svg?branch=develop)](https://travis-ci.com/Amriesgrace/Questioner)
[![Coverage Status](https://coveralls.io/repos/github/Amriesgrace/Questioner/badge.svg?branch=develop)](https://coveralls.io/github/Amriesgrace/Questioner?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/65a5d1bc5418da3c6933/maintainability)](https://codeclimate.com/github/Amriesgrace/Questioner/maintainability)

### Github Page
[Homepage](https://amriesgrace.github.io/Questioner/UI/index.html)

#### To see Questioner running go [here] (https://questioner-1.herokuapp.com/)

### To Install 
1. Clone this repository
2. Run npm install to install dependencies
3. Cd into the cloned and start the application by running npm start 
4. Install postman to test all endpoints on port 8000
5. To test, run npm test

### Available API routes
- API routes to create a new meetup
  * POST : ```/api/v1/meetups``` (topic, location, date, tags)
  

- API route that allows users to get one meetup details
    * GET : ```/api/v1/meetups/:id``` 

- API route that allow users to get all meetup records 
  * GET : ```/api/v1/meetips``` 

- API route to fetch all upcoming meetups 
  * GET : ```/api/v1/meetups/upcoming```

- API route to create a question
  * PUT : ```/api/v1/questions/```(meetup, title, question)

- API route to upvote a question
  * PATCH : ```/api/v1/questions/:id/upvote```

- API route to downvote a question
  * GET : ```/api/v1/questions/:id/downvote```

- API route to rsvp to a meetup
  * GET : ```/api/v1/meetups/:id/rsvp```