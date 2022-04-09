export function generateUuid(): string {
    // tslint:disable-next-line
    return [Date.now().toString(36), Math.floor(Math.random() * 0xfffff).toString(36)].join('-');
}