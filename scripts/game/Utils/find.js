export function findObject(id, data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id = id) return data[i];
    }
}