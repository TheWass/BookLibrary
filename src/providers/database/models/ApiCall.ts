import { SQLResultSet } from 'expo-sqlite';
import * as sqlite from '../sqlite';

export interface ApiCall {
    service: string;
    request: string;
    response: string;
}

export const createTable = (): Promise<SQLResultSet> => {
    const sql = 'CREATE TABLE IF NOT EXISTS ApiCall (service TEXT, req TEXT, res TEXT);';
    return sqlite.executeSql(sql);
}

export const saveApiCall = (call: ApiCall): Promise<SQLResultSet> => {
    const sql = 'INSERT INTO ApiCall (service, req, res) VALUES (?, ?, ?)';
    return sqlite.executeSql(sql, [call.service, call.request, call.response]);
}

export const purgeApiCalls = (): Promise<SQLResultSet> => {
    const sql = 'DELETE FROM ApiCall;';
    return sqlite.executeSql(sql);
}
