module.exports = (query) => {
    return {
        q: query.q,
        pg: query.pg
    };
};