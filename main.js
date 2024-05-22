const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const { execSync } = require('node:child_process')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})

ipcMain.handle('exec', (event, str) => {
  const output = execSync(str);
  console.log(output.toString());
})
