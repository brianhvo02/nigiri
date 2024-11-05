interface AniListPerson {
    id: number;
    nameGiven: string;
    nameFamily: string;
    nameJapanese: string;
    image: string;
}

interface AniListActor extends AniListPerson {
    language: string;
}

interface AniListCharacter extends AniListPerson {
    role: 'Main' | 'Supporting' | 'Background';
    voiceActors: AniListActor[];
    description: string;
}

interface AniListAnime {
    id: number;
    titleRomaji: string;
    titleEnglish: string;
    titleJapanese: string;
    format: 'TV' | 'TV Short' | 'Movie' | 'Special' | 'OVA' | 'ONA' | 'Music' | 'Manga' | 'Novel' | 'One Shot';
    season: 'Spring' | 'Summer' | 'Fall' | 'Winter';
    year: number;
    episodes: number;
    description: string;
    studios: {
        id: number;
        name: string;
    }[];
    airingSchedule: {
        episode: number;
        airDate: number;
    }[];
    coverImage: string;
    bannerImage: string;
    characters: AniListCharacter[];
}