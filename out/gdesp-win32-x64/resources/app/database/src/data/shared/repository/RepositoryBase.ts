import { ipcMain } from 'electron';

export function getAll(repo: any, channel: string): void {
  ipcMain.on(channel, async (event: any, ...args: any[]) => {
    try {
      event.returnValue = await repo.find();
    } catch (err) {
      throw err;
    }
  });
}

export function add(repo: any, typeEntity: any, channel: string): void {
  ipcMain.on(channel, async (event: any, item: typeof typeEntity) => {
    try {
      const entity = await repo.create(item);
      await repo.save(entity);
      event.returnValue = await repo.find();
    } catch (err) {
      throw err;
    }
  });
}

export function deleteItem(repo: any, typeEntity: any, channel: string): void {
  ipcMain.on(channel, async (event: any, item: typeof typeEntity) => {
    try {
      const entity = await repo.create(item);
      await repo.remove(entity);
      event.returnValue = await repo.find();
    } catch (err) {
      throw err;
    }
  });
}
