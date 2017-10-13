module.exports = (query) => {
    const slackText = query.text;
    const params_ar = slackText.split(' in ');

    return {
        q: params_ar[0],
        pg: params_ar[1]
    }
};
