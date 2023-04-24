import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import * as Share from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

export const DATABASE_NAME = 'AppSQLite.db3';

export const takeWalCheckpoint = async (): Promise<void> => {
    const db = SQLite.openDatabase(DATABASE_NAME);
    return new Promise((resolve) => {
        db.exec([{ sql: 'PRAGMA wal_checkpoint(TRUNCATE);', args: [] }], false, () => resolve());
    });
};

export const getDbPath = async (): Promise<string> => {
    // expo-sqlite always puts it under the SQLite folder. 
    const file = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/' + DATABASE_NAME);
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

export const importDb = async (): Promise<void> => {
    const result = await DocumentPicker.getDocumentAsync();
    if (result.type == 'success') {
        const file = await getDbPath();
        await FileSystem.deleteAsync(file);
        FileSystem.copyAsync({
            from: result.uri,
            to: file,
        })
    }
};

export const executeSql = async (sql: string, data?: Array<string|number|null>): Promise<SQLite.SQLResultSet> => {
    const db = SQLite.openDatabase(DATABASE_NAME);
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            executeSqlTx(tx, sql, data).then((res) => resolve(res)).catch((err: SQLite.SQLError) => reject(err));
        }, (error) => reject(error));
    });
};

export const executeSqlTx = async (tx: SQLite.SQLTransaction, sql: string, data?: Array<string|number|null>): Promise<SQLite.SQLResultSet> => {
    return new Promise((resolve, reject) => {
        tx.executeSql(sql, data, (_tx, res) => resolve(res), (_tx, err) => { reject(err); return false; });
    });
};
