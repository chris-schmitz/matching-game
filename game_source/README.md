# matching-game

> A simple image memeory matching game.

![alpha demo](readme_attachments/alpha-demo.gif)


# What this is
This project is a matching game I built for my daughter ... aaaand a platform for me to explore a couple of new tools, concepts, and project structures ;).

The goal of this project was to build a matching game with a component codebase that will work both on the web and on the desktop.

The UI is built using [vue.js](https://www.vuejs.org), the state is maintained through the [vuex](https://github.com/vuejs/vuex), and the game is delivered via the web and to the desktop via [electron](electron.atom.io).

Vue has been my js ui/ux toolset of choice for a while now, but up until this project I've not used vuex for state management; I tended to create my own custom store for managing state. A large part of building out this project was creating a real world scenario for me to buckle down in and grok vuex. I've built one electron app before, [AppLauncher](https://github.com/chris-schmitz/app-launcher) and loved electron so this is my second big dive into it.

# Design, planning, and prototypes

Whenever I start a new project I tend to wireframe it to get my ideas out.

![wireframe pic](readme_attachments/wireframe.png)

The wireframe can be found [in the d]

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
