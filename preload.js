const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  exec: async (str) => {
    const r = await ipcRenderer.invoke('exec', str)
    console.log(r)
  }
})
