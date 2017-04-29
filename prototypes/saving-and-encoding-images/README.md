# saving-and-encoding-images

> Prototype to figure out saving of images for the matching game.

This prototype allows you to drag and drop images onto the window. The images are then base64 encoded, saved to localStorage, and then rendered out to the display.

The encoded images can then be enlarged by clicking on the thumbnail.

The images can be deleted by clicking the 'X' on the thumbnail. Deleting the images will remove them from local storage.

![demo gif](readme-attachments/aaaaaand-done.gif)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron app for production
npm run build

# lint all JS/Vue component files in `app/src`
npm run lint

# run webpack in production
npm run pack
```
More information can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/docs/npm_scripts.html).

---

This project was generated from [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about this project can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
