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
  - The basic webRTC example works.... but only locally. Doesn't work on another computer on the same network, another network (via 4G) or Heroku. Meanwhile, a simple NodeJS websocket script was able to connect to all of these endpoints.
    - Could it be that I need a TURN server? Medium. Could try (paid) TURN server - https://www.twilio.com/docs/stun-turn
    - Could it be an invalid Google ICE STUN link? Low. Could try Twilio STUN server - https://www.twilio.com/docs/stun-turn
    - Could it be something on my computer, firewall, setting, etc? Low. Could try on Scott's computer.
    - Could it be that the WS implementation in Godot changed since this tutorial was written? Low. Could try 3.1/3.0/2.9 release.
    - Could it be a bad implementation of WS by Godot? Very low. Could try a stable release (3.1)
    - UPDATE: WebRTC works totally fine on my Mac + Scott's Linux, so it's either my desktop in particular, or Windows in general