# Budget-App
Budget app - an app that helps you manage your monthly budget on the go. 

This project relays on AngularJS & Firebase. We use Firebase to authenticate users and store data on the back-end. 

You can view live example <a href="http://pawelkaim.com/d/budget/">here</a>.

#Project features: 

- register user with Firebase
- login user
- log-out
- create, read, update & delete budget
- add expenses
- add monthly expenses
- calculate monthly and extra expenses
- calculate total & current ballance
- change currency
- angular form validation

#Getting Started

To get you started you can simply clone the #Budget-App repository and install the dependencies:

<h3>#Clone Budget-App</h3>

Clone the Budget-App repository using git:

 <code>git clone https://github.com/PawelK2012/Budget-web-client.git  </code>

 <code>cd budget  </code>

<h3>#Install Dependencies</h3>
We have preconfigured npm to automatically run npm and bower so we can simply do:

 <code> npm install </code>

and then 

<code> bower install </code>

<h3>#Run the Application</h3>

We have preconfigured the project with a simple development web server. The simplest way to start this server is:

 <code> npm start  </code>

#Compile SASS with Gulp

Inside project directory run command <code> gulp </code>. This will run Gulp task to watch all SASS and concat them into one CSS file.

 <code> gulp </code>

#Updating dependencies

You can update the tool dependencies by running:

 <code> npm update  </code>

You can update the Angular dependencies by running:

 <code> bower update  </code>

#Running E2E test
From e2e-tests dir: 

Download webdriver <code>webdriver-manager update</code>

Now start up a server with: <code>webdriver-manager start</code> 

Run the test with <code>protractor conf.js</code>

#TO DO:
- [ ] <strong> By default system should display list of budgets by last updated budget </strong>
- [ ] <strong> Add more E2E tests </strong>
- [ ] <strong> Add unit tests </strong>
- [ ] <strong> Add gulp task to minified JS files </strong>
- [ ] <strong> Add social network logins </strong>
- [ ] <strong> Move charts to separate service/directive </strong>
- [ ] <strong> Fix current issue with bootstrap-sass </strong>
- [ ] Add Firebase do dependencies
