/* eslint-disable @typescript-eslint/no-explicit-any */
import 'expo-sqlite'

declare module 'expo-sqlite' {
    interface SQLResultSetRowList {
        _array: Array<any>
    }
}