export interface MyData{
    id: number;
    name: string;
}

export const openDatabase = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('myDatabase', 1);

        // 判斷有沒有myStore，沒有的話就建立
        request.onupgradeneeded = function(event){
            const db = (event.target as IDBOpenDBRequest).result;
            if(!db.objectStoreNames.contains("myStore")){
                db.createObjectStore("myStore", {keyPath: "id"});
            }
        };

        request.onsuccess = (event) => {
            resolve((event.target as IDBOpenDBRequest).result);
        };

        request.onerror = (event) => {
            reject(new Error(`IDBDatabase error: ${(event.target as IDBOpenDBRequest).error?.message}`));
        };
    })
}

export const addData = (db: IDBDatabase, data: MyData): Promise<void> => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["myStore"], "readwrite");
        const store = transaction.objectStore("myStore");
        const request = store.add(data);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = (event) => {
            reject(new Error(`IDB Add error: ${(event.target as IDBRequest).error?.message}`));
        };
    });
}

export const getData = (db: IDBDatabase, id: number): Promise<MyData | undefined> => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["myStore"], "readonly");
        const store = transaction.objectStore("myStore");
        const request = store.get(id);

        request.onsuccess = (event) => {
            resolve((event.target as IDBRequest<MyData>).result);
        };

        request.onerror = (event) => {
            reject(new Error(`IDB Get error: ${(event.target as IDBRequest).error?.message}`));
        };
    });
}