# Spider MC Website

A responsive, static Minecraft server website built with HTML, CSS and vanilla JavaScript. Ready for GitHub Pages.

## Features
- Blue cyber gaming design
- Responsive mobile navigation
- Live Java server status, player count, version and MOTD
- Copyable Java and Bedrock addresses
- Server feature cards and Discord link
- No build tools or framework required

## Configure your server
Open `script.js` and edit the `CONFIG` object:

```js
const CONFIG = {
  javaAddress: "spidersmp.mc-join.org",
  bedrockAddress: "spidersmp.mc-join.org",
  bedrockPort: 27317,
  refreshMs: 60000
};
```

Also update the server address in `index.html` if you change it. Update the Discord invite URL in `index.html` to your current invite.

**Live status note:** the site reads public Java status from the third-party mcsrvstat.us API. Availability depends on that service and whether your server permits status queries. Player names may not be returned by the API. The Bedrock address is displayed for joining; this template does not currently fetch Bedrock status.

## Publish with GitHub Pages
1. Create a GitHub repository named `spider-mc-website`.
2. Upload all files and folders from this project. Keep `index.html` in the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then click **Save**.
6. Wait for GitHub Pages to publish your site. Your URL will look like `https://YOUR-USERNAME.github.io/spider-mc-website/`.

## Local preview
Open `index.html` in a browser. For the most reliable preview, use a local static server or VS Code Live Server.

## Credits
Minecraft is a trademark of Microsoft/Mojang. Spider MC is an independent community project and is not affiliated with Mojang or Microsoft.
