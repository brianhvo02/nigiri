import { Handler } from 'express';
import { createReadStream } from 'fs';
import { stat } from 'fs/promises';
import { extname, join } from 'path';
// import { lookup } from 'mime-types';

const FileController: Handler = async function(req, res, next) {
    const filePath = join('/mnt/mediaserver/TV Shows', req.params.path);

    const [start, end] = req.headers.range?.startsWith('bytes=')
        ? req.headers.range.slice(6).split('-').map(val => parseInt(val) || undefined)
        : [];
        
    // const mime = lookup(filePath);
    // if (!mime) {
    //     res.end();
    //     return;
    // }
    // res.setHeader('Content-Type', mime);

    const { size: contentLength } = await stat(filePath)
        .catch(err => {
            console.error(`File stat error for ${filePath}.`);
            console.error(err);
            res.status(500);
            return { size: 0 };
        });

    if (!contentLength) {
        res.end();
        return;
    }

    if (req.method === 'HEAD') {
        res.statusCode = 200;
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Content-Length', contentLength);
        res.end();
        return;
    }

    const retrievedLength = start !== undefined
        ? end !== undefined
            ? (end + 1) - start
            : contentLength - start
        : end !== undefined
            ? (end + 1)
            : contentLength;

    res.statusCode = start || end ? 206 : 200;

    res.setHeader('Content-Length', retrievedLength);

    if (req.headers.range) {  
        res.setHeader('Content-Range', `bytes ${start || 0}-${end || (contentLength - 1)}/${contentLength}`);
        res.setHeader('Accept-Ranges', 'bytes');
    }

    createReadStream(filePath, { start, end })
        .on('error', error => {
            console.log(`Error reading file ${filePath}.`);
            console.log(error);
            res.sendStatus(500);
        }).pipe(res);
}

export default FileController;