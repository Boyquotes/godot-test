TODO:
- first, try having the server just listen to UDP traffic directly
- have clients ping server for port, see if connecting to that port via UDP gets registered
  - challenge here, would I need separate ports for HTTP vs UDP? Maybe not? https://stackoverflow.com/questions/37636580/heroku-node-js-i-have-a-server-which-uses-multiple-ports-how-can-i-get-herok

Netowrking types
- HTTP / TCP - nope
- UDP, an option but can't be done with Heroku / doesn't listen to UDP messages
- WebSockets, works out of the box and with domain names... but doesn't do P2P
- WebRTC, supports P2P
  - Twilio has free STUN server - https://www.twilio.com/stun-turn
  - Godot seems to support this as a first class multiplayer construct https://docs.godotengine.org/en/latest/classes/class_webrtcmultiplayer.html - supposed minimal example - https://docs.godotengine.org/en/latest/tutorials/networking/webrtc.html