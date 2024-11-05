import { Handler } from 'express';
import PocketBase from 'pocketbase/cjs';
import { getAniListAnime } from './AniListController';

const pb = new PocketBase('https://releases.moe');
export const entries = pb.collection<SeadexEntry>('entries');
export const torrents = pb.collection<SeadexTorrent>('torrents');

export const GetLatestEntriesSeadex: Handler = async function(req, res, next) {
    const page = typeof req.query.p === 'string' ? parseInt(req.query.p) : undefined;
    const count = typeof req.query.count === 'string' ? parseInt(req.query.count) : undefined;
    const list = await entries.getList(page, count ?? 10, { sort: '-updated', expand: 'trs' })
        .catch(next);
    if (!list) return;

    if (!req.query.al) {
        res.json(list);
        return;
    }

    const items = await Promise.all(
        list.items.map(async item => ({ ...item, aniListInfo: await getAniListAnime(item.alID) }))
    );

    res.json({ ...list, items });
}