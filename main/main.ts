import { DespesaEntity } from './../database/src/domain/entity/despesa.entity';
import { createConnection } from 'typeorm';
import { app, BrowserWindow } from 'electron';
import { enableLiveReload } from 'electron-compile';
import 'reflect-metadata';
import { DataBaseContext } from '../database/src/data/databaseContext';
import { CategoriaEntity } from '../database/src/domain/entity/categoria.entity';
import * as _path from 'path';
import * as _fs from 'fs';
import { ipcMain } from 'electron';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null;

const isDevMode = process.execPath.match(/[\\/]electron/);
const isProd = process.env.PORTABLE_EXECUTABLE_DIR;

if (isDevMode) {
  enableLiveReload();
}


const createWindow = async () => {

  const connection = await createConnection({
    type: 'sqlite',
    synchronize: true,
    logging: true,
    logger: 'simple-console',
    database: isDevMode ? `${__dirname}/../src/assets/data/database.sqlite` : `./database.sqlite`,
    entities: [ CategoriaEntity, DespesaEntity ],
  });
  new DataBaseContext(connection);

  // Create the browser window.
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    frame: isDevMode == null || isDevMode === undefined ? false : true,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.setMenu(null);
  mainWindow.maximize();

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/../dist/index.html`);

  // Open the DevTools.
  if (isDevMode) {
    mainWindow.webContents.openDevTools();
  }


  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on('close-app', async () => {
  app.quit();
});
