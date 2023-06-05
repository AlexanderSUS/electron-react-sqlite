const { app, BrowserWindow, ipcMain } = require('electron');

const path  = require('path');
const sqlite3 = require('sqlite3');

const database = new sqlite3.Database('./db.sqlite3', (err) => {
  if (err) console.error('Database opening error: ', err);
})

function createWindow() {
  const window = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  })
  
  window.webContents.openDevTools();
  window.loadFile('index.html');
}

ipcMain.on('message', (event, arg) => {
  // console.log(arg)
  const sql = arg;

  database.all(sql, (err, rows) => {
    event.reply('reply', (err && err.message) || rows);
  })

  // if (arg === 'ping') {
  //   event.reply('reply', 'pong!') 
  // } else {
  //   event.reply('reply', 'please send me ping');
  // }
})

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
})

app.whenReady().then(createWindow)