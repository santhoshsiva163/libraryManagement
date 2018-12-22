export class Book {
    constructor(
        public key: string,
        public title: string,
        public id: number,
        public author: string,
        public category: string,
        public imageURL: string,
        public isbnBook: number,
        public desc: string,
        public stock: number,
        public availableDays: number,
        public location: string
    ) { }
}