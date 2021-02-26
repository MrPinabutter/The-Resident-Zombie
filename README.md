# The-Resident-Zombie
App Mobile in React Native using expo

### Instalation 
Using yarn </br>
<code> yarn install </code></br>

### Execution
Start aplication with this script </br>
<code> yarn start </code>
<blockquote>You can use your own device with the Expo Go app (avaliable in PlayStore) or use IOs or Android Emulator</blockquote> 

## Screens and Routing
Was chose create the app the simple way possible, in a Zombie Apocalypse you can't be worry about going through multiple pages, 2 pages for Register and 1 page 
for contacts and info and 1 for trade.

### Register
In the first entering on the app, you get in a screen with just the logo and a button for get started. Then you go to the Register user Page, 
where you provide info, name, age, gender and location (get automatically, you just have to allow gps). </br></br>

After go to next page you can register your items, just selecting the item in Picker selector and telling the amount you have and hitting the add button. 
I chose that design because its easy and pratical for use, the items appear  in the screen after you add, and you can delete or overwrite them. </br></br>

When finished the app will comunicate to api to use the database to create your account, if successed the app will use AsyncStorage to register the User ID in phone and used
so that you cannot register again. </br></br>

The Authentication was made using Context Hooks in react, where the application checks for the User id storage, if found it the app will go to the Landing Page.

### Landing
After register you stop at Landing Page, and you see the some infos of your profile on top, and just bellow you have a Scroll View of your contacts saved
to AsyncStorage. Unfotunately you can't search for especific contacts ( Stays for a second version ). </br></br>
For interaction with contacts you can swipe for left to release the delete and trade actions, and swiping for right you have the report infected action.
They have very intuitive icons and colors so you don't make mistakes.</br></br>
On the bottom-left side you find a Fab Button which after click it releases 3 actions:
<ul>
  <li> Share your QR Code </li>
  <li> Update location </li>
  <li> Add new contact </li>
</ul>
Every action opens a modal with yours respectives contents. 
Are some things unfineshed, like, the TradePage is not conected to API, still need to create loading screens, create update location modal, report infected, update user and refactor the LandingPage.

## Images
All the images and logos in the app has geted in Flaticon and Pixabay
