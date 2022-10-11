# Friendly

A responsive web application chat-app used with Html Css Javascript react redux and back end with firebase.

### :zap: [Website HERE](https://chatapp-react-firebase-8b8ad.web.app/)

![screenshot](/chat-app-firebase/public/screenshot.png)

- [About](#about)
- [How To Run Locally](#how-to-run-locally)
- [Bugs And Update Plan](#Bugs-and-update-plan)

## About

This is a responsive web application chat-app used with Html Css Javascript React Hooks React Router Redux Rtk and back end with Firebase.

It has main 5 pages,and user can sigin signup to send messages to other users, and add them to friend list to start private chat.

### Home Page

- intrduction of this website
- a start button link to loginpage
- link to about page
- link to contact page

### Register and Login Page

- user can signup signin with email password or google and yahoo account
- new account should verif their email address
- user can reset their password by reviving a email
- if user is login, the page will redirect to public page and now allowed to back
- if user is notlogin, they will now allowed to access profile,public,personal page
- if user is login, the register and login buttion will hide and profile,logout buttion will show
- made with firebase Authentication

### Profile Page

- if user is login, their default userinfo will store in firebase store and showed in profile page
- user profile page will show user's avatar,name,email,createtime,introduction
- user can change avatar, name, introduction at any time
- the email will only showed at profile page ,user can not see other user's email
- the introduction have 400 words limit

### Public Page

- user can see public messages sent by other users
- click other user's avatar or name will show other's profile
- click other user's text will redirect to personal page and add other user to friend list to start a chat
- when user click newpublic message button or refrsh the page will get last 50 public messages from firbase store
- when user send a public message , a successful box will show for 2s, and user can not see their own messages

### Personal Page

- user's friend will show the left and message box will show the right
- click a user box will get private messages from firebase store and render it at message box
- personal chat will not only send text but also can send emoji or pictures
- user can send more than one picture and the icon will show how many pictures they selected
- click image can make it more bigger
- cilck other user's name or avator will open their profile
- click close svg will alert user if they want to delete this user from their friend list
- when user reveive a messages from others, the user box will show a new info , and the lastmessage
- user can see if other user isOnline by a small green or red dot at user box
- if screen size is small, the screen will only show user box or message box , click user to open a message box and click back svg to back user box

## How To Run Locally

1. Clone this repo

2. Run yarn install

Create .env file at root level of project and add REACT_APP_API_KEY, REACT_APP_AUTH_DOMAIN, REACT_APP_DATABASE_URL, REACT_APP_PROJECT_ID, REACT_APP_STORAGE_BUCKET, REACT_APP_MESSAGING_SENDER_ID, REACT_APP_APP_ID

Value of REACT_APP_DATABASE_URL will be https://YOUR-FIREBASE-PROJECT-NAME.firebaseio.com simply replace YOUR-FIREBASE-PROJECT-NAME with your project name

3. Install all the dependencies

```

yarn i

```

4. Run yarn start

```

yarn start

```

## Bugs And Update Plan

- when newfriend add to user's friend list , it can not add to the lastarry

- click the outside of emoji box can close it , but some place is now worked

- need to add block feature to stop user send messages after they was deleted by others

- need to add feature that when user click new public messages or slide the screen the early public messages will showed
