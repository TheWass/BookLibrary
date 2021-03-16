import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import * as Share from 'expo-sharing';

export const DATABASE_NAME = 'AppSQLite.db3';

export const initializeDatabase = async (): Promise<void> => {
    const conn = SQLite.openDatabase(DATABASE_NAME);
    conn.transaction((trans) => {
        trans.executeSql('CREATE TABLE IF NOT EXISTS ApiCall (service TEXT, req TEXT, res TEXT);');
        trans.executeSql('CREATE TABLE IF NOT EXISTS Book (isbn TEXT, author TEXT, title TEXT, readCt INT);');
    })
};

export const takeWalCheckpoint = async (): Promise<void> => {
    const conn = SQLite.openDatabase(DATABASE_NAME);
    return new Promise((resolve) => {
        conn.exec([{ sql: 'PRAGMA wal_checkpoint(TRUNCATE);', args: [] }], false, () => resolve());
    });
};

export const getDbPath = async (): Promise<string> => {
    // expo-sqlite always puts it under the SQLite folder. 
    const file = await FileSystem.getInfoAsync('SQLite/' + DATABASE_NAME);
    return file.uri;
};

export const wipeDb = async (): Promise<void> => {
    const file = await getDbPath();
    FileSystem.deleteAsync(file);
};

export const exportDb = async (): Promise<void> => {
    await takeWalCheckpoint();
    const file = await getDbPath();
    Share.shareAsync(file);
};

export const executeSql = async (sql: string, data: Array<string|number|boolean>): Promise<SQLite.SQLTransaction> => {
    const conn = SQLite.openDatabase(DATABASE_NAME);
    return new Promise((resolve, reject) => {
        conn.transaction((trans) => {
            trans.executeSql(sql, data, (res) => resolve(res));
            //trans.executeSql('INSERT INTO ApiCall VALUES (service = ?, req = ?, res = ?', [ system, request, response ]);
        }, (error) => reject(error));
    });

};
