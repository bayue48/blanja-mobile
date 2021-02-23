# BlanjaIn React-Native

## Contents

- [Description](#description)
- [Features](#features)
- [Requirements](#requirements-for-development)
- [Installation](#installation-for-development)
- [Screenshot](#screenshot)
- [Related Project](#related-project)

## Description

**BlanjaIn** is a app-based e-commerce application that allows buyers to order
products of their choice. Consists of 2 types of users, namely buyers and
sellers.

## Features

- Browsing items
- Order product
- History transaction
- Add or edit product (sellers only)
- Chat with seller
- Edit profile
- Reset Password
- etc

## Requirements for Development

- [`Node Js`](https://nodejs.org/en/)
- [`npm`](https://www.npmjs.com/get-npm)
- [`ReactNative`](https://reactnative.dev/)
- [`BlanjaIn Backend`](https://github.com/ariefw96/blanja-restAPI)

## Installation for Development

1. Open your terminal or command prompt
2. Type `git clone https://github.com/ariefw96/blanjaIn-React-Native.git`
3. Open the folder and type `npm install` or `yarn install` for install dependencies from package.json
4. Create file **_.env_** in root directory with the following contents :

```bash
BASE_URL = "your_backend_API_URL"
```

Example :

- http://host_backend:port_backend is http://localhost:8000

so, you can write in .env file like this :

```bash
BASE_URL = "http://localhost:8000"
```

5. Before run this project, you must configure and run backend. You can find backend for this project [here](https://github.com/ariefw96/blanja-restAPI)
6. Type `npm run server` in terminal for running backend.
7. If you want to build this project, type `react-native start --reset-cache` then `react-native run-android`.

## Screenshot

# Here some display about the app

|  Home                |  Product Details                        |
|----------------------|-----------------------------------------|
| <img src="https://user-images.githubusercontent.com/70320451/107331704-ce87e680-6ae5-11eb-9d64-c3edf9b9c8b4.jpg" width="450" />  | <img src="https://user-images.githubusercontent.com/70320451/107331694-ccbe2300-6ae5-11eb-9645-8bb0bbf51789.jpg" width="450" />             |

|  Cart                |  Shipping Address                       |
|----------------------|-----------------------------------------|
| <img src="https://user-images.githubusercontent.com/70320451/107331707-cf207d00-6ae5-11eb-8e50-c855e9c2c17a.jpg" width="450" />  | <img src="https://user-images.githubusercontent.com/70320451/107331698-cd56b980-6ae5-11eb-887b-5f2094c8517d.jpg" width="450" />             |

|  My Order            |  Order Details                          |
|----------------------|-----------------------------------------|
| <img src="https://user-images.githubusercontent.com/70320451/107331686-caf45f80-6ae5-11eb-9341-1fd88eab0e6a.jpg" width="450" />  |<img src="https://user-images.githubusercontent.com/70320451/107331700-cdef5000-6ae5-11eb-97fa-f983107dcf12.jpg" width="450" />|

## Related Project

**restful-API**


[`BlanjaIn-restAPI`](https://github.com/ariefw96/BlanjaIn-restAPI)

Other project

[`BlanjaIn (ReactJs)`](https://github.com/ariefw96/BlanjaIn-React)

