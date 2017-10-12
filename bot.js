const url = require('url');
const fetch = require('node-fetch');

const app = Object.create(null, {
    markup: {
        value: (text) => {
            return `<span style="background-color: #FFE700;">${text}</span>`;
        }
    },

    /**
     * Mark up all occurences of `findMe` in `pile`
     */
    highlight: {
        value: (findMe, pile) => {
            const markup = app.markup(findMe);
            const re = new RegExp(findMe, 'g');

            return pile.replace(re, markup);
        }
    },

    /**
     * Requests a document
     * Marks up keywords
     * Outputs the re-written document
     */
    run: {
        value: async (req, res) => {
            let out;

            // request pg
            const query = url.parse(req.url, true).query;
            const pg = await fetch(query.pg);

            out = app.highlight(query.q, await pg.text());

            res.setHeader('content-type', 'text/html');
            res.end(out);
        }
    }
});

module.exports = app;