# Fronten Minecraft Administration Web Interface

Framework agnostic web app template. This project is like [Next.js](https://nextjs.org/) but without the framework.

[View web app.](http://104.128.60.130:19304/)

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)


## Install

Clone the repository:

```sh
git clone https://github.com/remarkablemark/web-app-template.git
cd web-app-template
```


Update the files:

- [ ] `README.md`
- [ ] `LICENSE`
- [ ] `package.json`
- [ ] `package-lock.json`
- [ ] `frontend/.env`
- [ ] `frontend/package.json`
- [ ] `frontend/package-lock.json`
- [ ] `frontend/src/pages/index.js`
- [ ] `frontend/src/pages/_app.js`
- [ ] `frontend/src/pages/_document.js`
- [ ] `frontend/src/pages/_error.js`

Install the dependencies:

```sh
npm install
```

Initialize a new repository:

```sh
rm -rf .git
git init
```

Make your first commit:

```sh
git add .
git commit -m 'feat: initialize project from web-app-template'
```


Once you're ready, [push the local repository to GitHub](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/) (or another remote repository):

```sh
git remote add origin <remote-repository-url>
git push origin -u origin master
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.

It correctly bundles in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run release`

Bumps the `package.json` version with [standard-version](https://github.com/conventional-changelog/standard-version).

### `npm run deploy`

Deploys the app to [GitHub Pages](https://pages.github.com/) by force pushing the `build` folder to the remote repository's `gh-pages` branch.

## Environment Variables

Environment variables work similarly to [Next.js](https://nextjs.org/docs/basic-features/environment-variables).

For example:

```
# .env
WEB_APP_VERSION=$npm_package_version
WEB_APP_DOMAIN=www.example.com
WEB_APP_FOO=$DOMAIN/foo
```

## Build

You can build the production app locally with:

```sh
npm run build
```

Or enter the build directory if your app is hosted at the root:

```sh
cd build
```


Stop the server with `Ctrl + C`.

Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

> If your app is hosted at a subdirectory, open the folder in the directory listing.

Once you're done, clean up the build directory.

If your app is hosted at a subdirectory:

```sh
rm -rf web-app-template
```

Or if your app is hosted at the root:

```sh
rm -rf build
```

## Layout

Directory structure (dotfiles are omitted):

```sh
tree -I 'build|node_modules'
. 
├── .gitignore
├── LICENSE
├── README.md
├── frontend
│   ├── .env
│   ├── .gitignore  
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── favicon.ico
│   │   └── index.html
│   └── src
│       ├── components
│       │   └── App.js
│       ├── pages
│       │   ├── _app.js
│       │   ├── _document.js
│       │   ├── _error.js
│       │   └── index.js
│       └── styles
│           └── index.css
└── backend
    ├── .gitignore
    ├── package.json
    ├── package-lock.json
    ├── server.js
    └── src
        └── index.js


```


## License

[MIT](LICENSE)