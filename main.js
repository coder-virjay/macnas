require('dotenv').config({ path: process.env.npm_lifecycle_event === 'start' ? '.env.development' : '.env.production' });
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

  win.loadFile(process.env.URL)
}

app.whenReady().then(() => {
  createWindow()
})

ipcMain.handle('exec', async (event, str) => {
  const output = await execSync(str);
  console.log(output.toString());
  return output.toString()
})
