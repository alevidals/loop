<img src="./assets/icon.png" alt="drawing" width="100"/>

<details>
<summary>Table of contents</summary>

- [Screenshots](#screenshots)
- [To start](#to-start)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)

</details>

----

# Screenshots

![Desktop screenshot 1](./assets/desktop-index.png)
![Desktop screenshot 2](./assets/desktop-products.png)
![Desktop screenshot 3](./assets/desktop-product.png)
![Mobile screenshot](./assets/mobile.png)

# To start

## Prerequisites

- Node > 20 version. You can use [NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) to setup a node version manager

- Package manager
  - PNPM
    ```sh
    npm install -g pnpm
    ```

  - NPM
    ```sh
    npm install -g npm@latest
    ```

  - YARN
    ```sh
    npm install -g yarn
    ```

- Fill the `.env` file with the required environment variables. You can use the `.env.example` file as a reference.

## Installation  

> If you are going to use a package manager other than "pnpm" run this command before you begin `rm -rf node_modules && rm pnpm-lock.yaml`

1. Clone the repository
    ```sh
    git clone https://github.com/alevidals/loop.git
    ```

2. Install the packages (You can use `npm` or `yarn` instead of `pnpm` if you like)
    ```sh
    pnpm install
    ```

3. Apply migrations and seed the database (You can use `npm` or `yarn` instead of `pnpm` if you like)
    ```sh
    pnpm db:migrate && pnpm db:seed
    ```

4. Execute the project (You can use `npm` or `yarn` instead of `pnpm` if you like)
    ```sh
    pnpm run dev
    ```