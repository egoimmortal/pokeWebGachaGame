export interface MyData{
    id: number;
    name: string;
}

export const openDatabase = (dbID = 1, dbName = 'pokemon'): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('pokeWebGachaGame', dbID);
        // 判斷有沒有 dbName的store，沒有的話就建立
        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            console.log('db = ', db);
            console.log('dbName = ', dbName);
            console.log('db.objectStoreNames.contains(dbName) = ', db.objectStoreNames.contains(dbName));
            if(!db.objectStoreNames.contains(dbName)){
                db.createObjectStore(dbName, { keyPath: "id" });
            }
        };

        request.onsuccess = (event) => {
            resolve((event.target as IDBOpenDBRequest).result);
        };

        request.onerror = (event) => {
            reject(new Error(`IDBDatabase error: ${(event.target as IDBOpenDBRequest).error?.message}`));
        };
    })
};

export const getData = (db: IDBDatabase, id: number, dbName = 'pokemon'): Promise<MyData | undefined> => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([dbName], "readonly");
        const store = transaction.objectStore(dbName);
        const request = store.get(id.toString());

        request.onsuccess = (event) => {
            resolve((event.target as IDBRequest<MyData>).result);
        };

        request.onerror = (event) => {
            reject(new Error(`IDB Get error: ${(event.target as IDBRequest).error?.message}`));
        };
    });
};

export const getDatabaseCount = (db: IDBDatabase, dbName = 'pokemon'): Promise<number> => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([dbName], "readonly");
        const store = transaction.objectStore(dbName);
        const countRequest = store.count();

        countRequest.onsuccess = (event) => {
            resolve((event.target as IDBRequest).result);
        };

        countRequest.onerror = (event) => {
            reject(new Error(`IDBDatabase error: ${(event.target as IDBOpenDBRequest).error?.message}`));
        };
    });
};

export const addData = (db: IDBDatabase, data: any, dbName = 'pokemon'): Promise<void> => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([dbName], "readwrite");
        const store = transaction.objectStore(dbName);
        const request = store.add(data);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = (event) => {
            reject(new Error(`IDB Add error: ${(event.target as IDBRequest).error?.message}`));
        };
    });
};

export const updateData = (db: IDBDatabase, id: number, data: any, dbName = 'pokemon'): Promise<void> => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([dbName], "readwrite");
        const store = transaction.objectStore(dbName);
        const request = store.get(id.toString());

        request.onsuccess = (event) => {
            const result = (event.target as IDBRequest<any>).result;
            Object.keys(data).forEach(key => {
                const value = data[key];
                result[key] = data[key];
                console.log(`${key}: ${value}`);
            });
            const updateRequest = store.put(result);

            updateRequest.onsuccess = (event) => {
                resolve((event.target as IDBRequest<any>).result);
            };

            updateRequest.onerror = (event) => {
                reject(new Error(`IDB Get error: ${(event.target as IDBRequest).error?.message}`));
            };
        };

        request.onerror = (event) => {
            reject(new Error(`IDB Get error: ${(event.target as IDBRequest).error?.message}`));
        };
    });
};