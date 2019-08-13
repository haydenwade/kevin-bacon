const rp = require('request-promise');
const baseUrl = 'http://localhost:3000';

test('should have 1 link of separation between Footloose and Kevin Bacon', async() => {
    const options = {
        method: 'POST',
        uri: baseUrl + '/separation',
        body:{
            source:'https://en.wikipedia.org/wiki/Footloose_(1984_film)'
        },
        json: true
    };
    const result = await rp(options);
    expect(result).toBe(1);
});

test('should have 2 links of separation between Tom Cruise and Kevin Bacon', async() => {
    const options = {
        method: 'POST',
        uri: baseUrl + '/separation',
        body:{
            source:'https://en.wikipedia.org/wiki/Tom_Cruise'
        },
        json: true
    };
    const result = await rp(options);
    expect(result).toBe(2);
});

test('should have ??? link of separation between Philosophy and Kevin Bacon', async() => {
    const options = {
        method: 'POST',
        uri: baseUrl + '/separation',
        body:{
            source:'https://en.wikipedia.org/wiki/Philosophy'
        },
        json: true
    };
    const result = await rp(options);
    expect(result).toBe('TODO');
});

test('should have ??? link of separation between Taj Mahal and Kevin Bacon', async() => {
    const options = {
        method: 'POST',
        uri: baseUrl + '/separation',
        body:{
            source:'https://en.wikipedia.org/wiki/Taj_Mahal'
        },
        json: true
    };
    const result = await rp(options);
    expect(result).toBe('TODO');
});