const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

require('electron-reload')(__dirname, {
    electron: path.resolve(__dirname, '..', 'node_modules', '.bin', 'electron')
})

let appWindow

function createWinow(){
    appWindow = new BrowserWindow({
        window: 1024,
        height: 780
    })

    appWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        // pathname: path.resolve(__dirname, '..', 'appindex.html'),
        protocol: 'file:',
        slashes: true
    }))

    appWindow.on('close', () => win = null)
}

app.on('ready', createWinow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (appWindow === null) {
        createWinow()
    }
})