# Everscale (ex. Free TON) DeBot Browser
## DEPRECATED
It is a v1 implementation which is not supported by the browser developers team anymore  
v2 implementation of a browser that uses the [Debot Web Embedding package](https://www.npmjs.com/package/debot-web-embedding) [(source)](https://github.com/Strafi/debot-embedding) to show all debot-related logic is available here: https://github.com/Strafi/Free-TON-DeBot-Browser/tree/master

## How To Run
If you don't want (or can not) to install the software mentioned below, you can access the pre-build DeBot browser by this link: https://freeton-stats.org/browser/.

### Pre-requirements  
To run the application locally, you need `node.js` and `yarn` or `npm` installed on your device.  
Clone the repository using git and navigate into it. Then, depending on which package manager you had installed, execute `yarn` or `npm install`.

### Run pre-build app
Depending on which package manager you had installed, execute `yarn serve` or `npm run serve`. This command will run a local server with your own DeBot Browser. 

### Build from source
Depending on which package manager you had installed, execute `yarn build` or `npm run build`. This command will create a new build (it will appear in the 'build' folder) that you can deploy to any hosting you wish. Also, you can deploy it locally using `yarn serve` or `npm run serve`.
