export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

export interface Album {
    userId: number;
    albumId: number;
    title: string;
}

export interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}
