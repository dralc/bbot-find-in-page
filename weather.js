const weather = require('yahoo-weather');
const url = require('url');

module.exports = async req => {

    const query = url.parse(req.url, true).query;

    if (!query.location) return 'no location in query';

    let weatherInfo = await weather(query.location);

    return `${weatherInfo.title} : ${weatherInfo.item.condition.temp}`;
};