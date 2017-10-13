const url = require('url');
const fetch = require('node-fetch');

const app = Object.create(null);

app.markup = (text) => {
    return `<span style="background-color: #FFE700;">${text}</span>`;
};

/**
 * Mark up all occurences of `findMe` in `pile`
 */
app.highlight = (findMe, pile) => {
    const markup = app.markup(findMe);
    const re = new RegExp(findMe, 'g');

    return pile.replace(re, markup);
};

/**
 * Requests a document
 * Marks up keywords
 * Outputs the re-written document
 */
app.run = async (req, res) => {
    let out, pg;

    // request pg
    const query = url.parse(req.url, true).query;
    const queryAdapter = require('./adapters/' + (query.adapter || 'browser'));
    const params = queryAdapter(query);

    pg = await fetch(params.pg);
    out = app.highlight(params.q, await pg.text());

    res.setHeader('content-type', 'text/html');
    res.end(out);
};

module.exports = app;