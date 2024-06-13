import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { join } from 'path'
const path = require('path')

function createWindow() {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    titleBarStyle: 'hidden',
    // show: true,
    trafficLightPosition: { x: 12, y: 21 },
    titleBarOverlay: { color: '#fff', symbolColor: 'black' }, // 在windows上，设置默认显示窗口控制工具
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  // 修改这里的路径以指向正确的 index.html 文件
  // const indexPath = path.join(__dirname, '../renderer/index.html')
  // console.log('Loading file from path:', indexPath)

  // window
  //   .loadFile(indexPath)
  //   .then(() => {
  //     console.log('File loaded successfully.')
  //   })
  //   .catch((err) => {
  //     console.error('Failed to load file:', err)
  //   })

  const indexPath2 = path.join(__dirname, '../renderer/src/App.vue')
  console.log('Loading file from path:', indexPath2)

  window
    .loadFile(indexPath2)
    .then(() => {
      console.log('File loaded successfully.')
    })
    .catch((err) => {
      console.error('Failed to load file:', err)
    })
  // window.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
