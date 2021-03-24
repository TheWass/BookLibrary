import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import * as Share from 'expo-sharing';
import * as model from './model';

export const DATABASE_NAME = 'AppSQLite.db3';

export const initializeDatabase = async (): Promise<void> => {
    await wipeDb();
    // TODO:  Calling this causes a require cycle.  Reafactor to remove.
    return model.createTables();
};

export const takeWalCheckpoint = async (): Promise<void> => {
    const db = SQLite.openDatabase(DATABASE_NAME);
    return new Promise((resolve) => {
        db.exec([{ sql: 'PRAGMA wal_checkpoint(TRUNCATE);', args: [] }], false, () => resolve());
    });
};

export const getDbPath = async (): Promise<string> => {
    // expo-sqlite always puts it under the SQLite folder. 
    const file = await FileSystem.getInfoAsync('SQLite/' + DATABASE_NAME);
    return file.uri;
};

export const wipeDb = async (): Promise<void> => {
    try {
        const file = await getDbPath();
        await FileSystem.deleteAsync(file);
    } catch {
        // Do nothing.
    }
};

export const exportDb = async (): Promise<void> => {
    await takeWalCheckpoint();
    const file = await getDbPath();
    Share.shareAsync(file);
};

export const executeSql = async (sql: string, data?: Array<string|number|boolean>): Promise<SQLite.SQLResultSet> => {
    const db = SQLite.openDatabase(DATABASE_NAME);
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            executeSqlTx(tx, sql, data).then((res) => resolve(res)).catch((err: SQLite.SQLError) => reject(err));
        }, (error) => reject(error));
    });
};

export const executeSqlTx = async (tx: SQLite.SQLTransaction, sql: string, data?: Array<string|number|boolean>): Promise<SQLite.SQLResultSet> => {
    return new Promise((resolve, reject) => {
        tx.executeSql(sql, data, (_tx, res) => resolve(res), (_tx, err) => { reject(err); return false; });
    });
}
