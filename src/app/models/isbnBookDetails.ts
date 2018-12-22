export class ISBNBookDetails {
    items: Item[];
}

interface Item {
    volumeInfo: VolumeInfo;
}

interface VolumeInfo {
    title: string;
    authors: string[];
    description: string;
    industryIdentifiers: IndustryIdentifier[];
    categories: string[];
    imageLinks: ImageLinks;
}

interface ImageLinks {
    smallThumbnail: string;
    thumbnail: string;
}

interface IndustryIdentifier {
    type: string;
    identifier: string;
}