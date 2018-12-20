[![Build Status](https://travis-ci.org/SAP/openui5-worklist-app.svg?branch=master)](https://travis-ci.org/SAP/openui5-worklist-app)
![OpenUI5 logo](http://openui5.org/images/OpenUI5_new_big_side.png)

# openui5-worklist-app
[OpenUI5](https://github.com/SAP/openui5) worklist app using the 
[UI5 Build and Development Tooling](https://github.com/SAP/ui5-tooling). 
This template implements a typical worklist floorplan, one of the design patterns that is specified by the [SAP Fiori Design Guidelines](https://experience.sap.com/fiori-design/). 
It includes generic application functionality and tests that can be easily extended. You can find more documentation on this template [here](https://openui5.hana.ondemand.com/#/topic/a77f2d29299247f8a3e30226507b1765).

You can also see the [template](http://sap.github.io/openui5-worklist-app/test/mockServer.html) live.

## Prerequisites
The **UI5 build and development tooling command line interface (UI5 CLI)** has to be installed.
For installation instructions please see [Installing the UI5 CLI](https://github.com/SAP/ui5-tooling#installing-the-ui5-cli).

## Setup
1. Clone the repository and navigate into it
    ```sh
    git clone https://github.com/SAP/openui5-worklist-app.git
    cd openui5-worklist-app
    ```
1. Install all dependencies
    ```sh
    npm install
    ```

1. Start a local server and run the application (http://localhost:8080/index.html)
    ```sh
    ui5 serve -o /index.html
    ```

## Testing
* Run ESLint code validation
    ```sh
    npm run lint
    ```
* Start a local server and execute the tests automatically after every change
    ```sh
    npm run watch
    ```
* Run ESLint, start a local server and run the tests in CI mode
    ```sh
    npm test
    ```

For more build and development options please see: [UI5 Build and Development Tooling](https://github.com/SAP/ui5-tooling)

## Support
This repository is based on the [OpenUI5 template demo apps](https://openui5.hana.ondemand.com/demoapps.html) and updated regularly with our latest recommendations. 
If you found a bug, please create an [OpenUI5 issue](https://github.com/sap/openui5/issues). Thank you!
