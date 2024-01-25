# DevelopersWeb

## A social networking site for Developers


## How to run

- Clone this repository or fork it.
  
  `git clone https://github.com/thecreatorsir/DevelopersWeb.git` or `git clone https://github.com/<your username>/DevelopersWeb.git`

- Inside `DevelopersWeb` go to config folder, create a new file called `keys_dev.js` which stores your `mongoURI` and `secretKey` information
  - store the database URI inside `mongoURI` variable
  - store your security key inside `secretKey` variable

 - example:
  ```
  module.exports = {
  mongoURI:
    "mongodb+srv://<name>:<password>@cluster0.diazc.mongodb.net/<collection>?retryWrites=true&w=majority",
  secretKey: "key",
};
  ```

- install all dependencies.
  - **Client side:**
    on the `client` directory type `npm install`
  - **Server side:**
    on the `DevelopersWeb` directory type `npm install`
- **Run it on node js:**
    In the `DevelopersWeb` directory type `npm run dev`

## About the web app (Refer to the image below for more details)
This app is developed using a MERN stack and it contains all the features that a social media platform has, like authentication, profile creation, updation, creating a post, and reacting on post etc. 



## The frameworks and libraries used for building the DevelopersWeb are
- **ReactJS** - for client-side rendering.

- **Redux** - for global state management using flux architecture.

- **Bootstrap** - for UI design.

- **Axios** - for HTTP request and response.

- **Bcrypt** - for creating a hashed password and making the app secure.

- **ExpressJS, NodeJS** - for creating the web application and letting the user communicate.

- **JSON web token** - every user of our API or website will be assigned a unique token, and this allows you to store the user state. And once the token expires the user will be automatically prompted to login.

- **MongoDB** - for Data Base

## Screenshots 

### Common Screens
**Landing page - Register page - Login page - Dashboard page - Notifications Modal**
<a href="https://ibb.co/WczVGSC"><img src="https://i.ibb.co/Zhg2Gy9/Home-Page.png" style="width:45%" alt="Home-Page" border="0"></a>
<a href="https://ibb.co/5cnB19j"><img src="https://i.ibb.co/RHBzgS6/Sign-up-page.png" style="width:45%" alt="Sign-up-page" border="0"></a>
<a href="https://ibb.co/3fsDc05"><img src="https://i.ibb.co/6vZ3F4c/login-page.png" style="width:45%" alt="login-page" border="0"></a>
<a href="https://ibb.co/bQMWgNg"><img src="https://i.ibb.co/vV6wxLx/post-feed-and-create-post.png" style="width:45%" alt="post-feed-and-create-post" border="0"></a>
<a href="https://ibb.co/x6zhZ4j"><img src="https://i.ibb.co/Yhf2grk/developers-profile-page.png" alt="developers-profile-page" border="0"></a>


### Developers(User) Screens

**Dashboard - Profile Page - Edit Profile page - Add education page - Add experience Page**
<a href="https://ibb.co/hfFCmD5"><img src="https://i.ibb.co/TLMrgmX/Dashboard.png" style="width:45%" alt="Dashboard" border="0"></a>
<a href="https://ibb.co/zJN0P8Q"><img src="https://i.ibb.co/nCR5Q36/profile-page.png" style="width:45%" alt="profile-page" border="0"></a>
<a href="https://ibb.co/1G8sQvc"><img src="https://i.ibb.co/8g6zsKk/edit-profile-page.png" style="width:45%" alt="edit-profile-page" border="0"></a>
<a href="https://ibb.co/XX1hmt5"><img src="https://i.ibb.co/y0twLqk/Add-education.png" style="width:45%" alt="Add-education" border="0"></a>
<a href="https://ibb.co/cQJFQ06"><img src="https://i.ibb.co/jDhMDmy/add-exp-page.png" style="width:45%" alt="add-exp-page" border="0"></a>




