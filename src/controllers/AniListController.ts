import { Handler } from 'express';
import { mdbClient } from '../mongodb';

const animeQuery = `query ($id: Int) {
    Media (id: $id, type: ANIME) {
        id
        title {
            romaji
            english
            native
        }
        format
        season
        seasonYear
        episodes
        description
        studios(isMain: true) {
            nodes {
                id
                name
            }
        }
        airingSchedule {
            nodes {
                episode
                airingAt
            }
        }
        coverImage {
            extraLarge
        }
        bannerImage
        characters(sort: [ROLE, RELEVANCE, ID]) {
            edges {
                role
                voiceActors(sort:[RELEVANCE,ID]) {
                    id
                    name {
                        first
                        last
                        native
                    }
                    image {
                        large
                    }
                    languageV2
                }
                node {
                    id
                    name {
                        first
                        last
                        native
                    }
                    image {
                        large
                    }
                    description
                }
            }
        }
    }
}`;

const capitalCase = function(str: string) {
    if (['OVA', 'ONA', 'TV'].includes(str)) return str;
    if (str === 'TV_SHORT') return 'TV Short';
    
    return str.split('_')
        .map(val => val[0].toUpperCase() + val.slice(1).toLowerCase())
        .join(' ');
};

const aniListCollection = mdbClient.db('nigiri').collection<AniListAnime>('anilist');

export const getAniListAnime = async function(id: number) {
    const data = await aniListCollection.findOne({ id });
    if (data) return data;

    const { data: { Media } } = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query: animeQuery,
            variables: { id }
        }),
    }).then(res => res.json());

    const anime: AniListAnime = {
        id: Media.id,
        titleRomaji: Media.title.romaji,
        titleEnglish: Media.title.english,
        titleJapanese: Media.title.native,
        format: capitalCase(Media.format) as AniListAnime['format'],
        season: capitalCase(Media.season) as AniListAnime['season'],
        year: Media.seasonYear,
        episodes: Media.episodes,
        description: Media.description,
        studios: Media.studios.nodes,
        airingSchedule: Media.airingSchedule.nodes
            .map(({ episode, airingAt }: { episode: number; airingAt: number; }) => ({
                episode, airDate: airingAt * 1000,
            })),
        coverImage: Media.coverImage.extraLarge,
        bannerImage: Media.bannerImage,
        characters: Media.characters.edges.map(({
            role, voiceActors, node: { 
                id, name: { first: nameGiven, last: nameFamily, native: nameJapanese }, 
                image: { large: image }, description 
            } 
        }: any): AniListCharacter => ({
            id, nameGiven, nameFamily, nameJapanese, image, description,
            role: capitalCase(role) as AniListCharacter['role'],
            voiceActors: voiceActors.map(({
                id, name: { first: nameGiven, last: nameFamily, native: nameJapanese }, 
                image: { large: image }, languageV2: language 
            }: any): AniListActor => ({ id, nameGiven, nameFamily, nameJapanese, language, image }))
        })),
    };

    await aniListCollection.insertOne(anime);

    return anime;
}

export const GetAnimeAniList: Handler = async function(req, res, next) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) next(new Error('AniList id is not a number.'));
    const anime = await getAniListAnime(id);
    res.json(anime);
}