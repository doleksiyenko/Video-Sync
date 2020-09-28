# Video-Sync
## Try out the site here
https://video-sync-dos.netlify.app
(NOTE: The server is hosted on a free heroku server, and may take a while to respond! If the register/login buttons don't work, the server most likely hasn't loaded up yet.)
## Introduction
Video Sync is a project working with React, NodeJS and Socket.io to create a website that allow you to sync videos from platforms such as YouTube and Facebook, allowing
users to watch videos with friends!
#### Welcome Page
When you first open the site, you are greeted by a welcome page, which asks you to enter a *Room Name* and a *Username*. Once both of these fields have values,
the *Join* button will enable, allowing you to join the room with the username. If the room that the user is trying to join already has a user with the same username as 
the user attempting to join, the user that is trying to join will have a random 4 character nanoid attached to their username (as to prevent duplicate usernames in the same room).
![Welcome Page](https://github.com/doleksiyenko/Video-Sync/blob/master/sample-images/welcome-page.PNG)
#### Room Page
Once the user has joined a room, they will enter the room page. This page has 3 main components. First, the main header, which shows the name of the room that the user is connected to,
and below that, the users which are currently connected to that room. Second, the main header, is the video player. This is where the user views the content, and is loaded from
YouTube/Facebook/Twitch... Above the video player is the URL bar, where the user can enter a link to be viewed by the entire room. The URL must be the full URL of the video
, not just the video ID itself (i.e https://www.youtube.com/watch?v=ZTFTngOG2bg not ZTFTngOG2bg). Below the video player is the control bar, which allows the user to seek through the video as well as play/pause the video. 
The user's actions are are synchronized to all other users (i.e pausing the video causes all the users' video players to pause). To the left of the video player is the 
chat window, where the users connected to the room can send messages to each other, so that they can talk about the video that they are watching. If the users are in the process of watching a video,
a new user who joins the room will automatically sync with what the room is watching (if the room is halfway through a video, a new user will join and the video will autoplay from
halfway through the video for the new user, unless the video in the room is paused, then the video will not autoplay). Every new room loads a default video (arbitrarily chosen to be https://www.youtube.com/watch?v=ZTFTngOG2bg)
##### First user joining a new room
![Default join room](https://github.com/doleksiyenko/Video-Sync/blob/master/sample-images/room.png)
##### Multiple users watching together!
![Multiple users watching video](https://github.com/doleksiyenko/Video-Sync/blob/master/sample-images/multiple-users-room.png)
