interface SeadexTorrent {
    collectionId: string;
    collectionName: 'torrents',
    created: string;
    dualAudio: boolean;
    files: {
        length: number;
        name: string;
    }[];
    id: string;
    infoHash: string | '<redacted>';
    isBest: boolean;
    releaseGroup: string;
    tracker: string;
    updated: string;
    url: string;
}

interface SeadexEntry {
    alID: number;
    collectionId: string;
    collectionName: 'entries';
    created: string;
    id: string;
    incomplete: boolean;
    notes: string;
    theoreticalBest: string;
    trs: string[];
    updated: string;
    expand?: {
        trs: SeadexTorrent;
    }
    aniListInfo?: AniListAnime;
}

interface ListResult<T> {
    items: T[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
}