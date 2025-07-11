# 🏕️ Yosemite Campsite Reservations


## 🌟 Highlights

- Reserve your spot at one of Yosemite's beautiful campsites
- Search the reservations page by campsite
- Edit, view or delete your reservations as needed
- Read about Yosemite news and information


## ℹ️ Overview

This project was built with a Node.js and Express backend and a React frontend styled with Tailwind CSS. Created with an MVC structure, this app uses MongoDB for the model, an Express API as the controller, and React for the view. It also integrates data from the National Park Service public API. The reservation feature provides full CRUD functionality. I implemented login and registration using JSON Web Tokens, stored in browser cookies for authentication. I created this app to showcase my expertise in the MERN stack, as well as my love for the outdoors! I also coded the Park Information tab to display my ability in working with external APIs and modern frontend styling.


## ✍️ Authors

Katie Chickering - https://github.com/katiechickering


## 🛜 Deployment

[Click here to view my deployed app!](main.d27jn0472fbh8c.amplifyapp.com)

To deploy my application, I used AWS App Runner for the backend API, and AWS Amplify for the frontend. Both services are connected to my GitHub monorepo and automatically update whenever changes are pushed to the repository. Environment variables were configured through the App Runner and Amplify interfaces. App Runner routes to my `server` folder, while Amplify routes to my `client` folder. To host my database, I used MongoDB Atlas.


## ⬇️ Local Installation

Open two terminals and route to the `server` folder and `client` folder respectively.

Run the command below in the `server` terminal:
```bash
npm install
```

Run the command below in the `client` terminal:
```bash
npm install
```

Then, create a `.env` file in both the `server` folder and `client` folder. Follow the instructions in the `.env.example` files to set up your environment variables.


## 🚀 Local Usage

First, run the command below in the `server` terminal:
```bash
npm start
```

Second, run the commands below in the `client` terminal:
```bash
npm run build
npm run preview
```

Copy and paste http://localhost:4173/ into your browser to view the application!


## 💭 Feedback and Contributing

If you found this insightful or if you have suggestions, please start a [discussion](https://github.com/katiechickering/yosemite-reservations/discussions/1)!