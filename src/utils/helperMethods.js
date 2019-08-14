const globalConstants = require('./globalConstants');

module.exports = {
    getIdFromBaseUrl: (fullUrl) => {
        return fullUrl.substr(globalConstants.wikipediaPrefix.length);
    },
    getFullUrlFromId: (id) => {
        return globalConstants.wikipediaPrefix + id;
    },
    checkPrefixForMatch: (str, prefixes = globalConstants.defaultWikiLinkPrefixes) => {
        for (let i = 0; i < prefixes.length; i++) {
            const prefixLength = prefixes[i].length;
            const substr = str.substr(0, prefixLength);
            if (substr === prefixes[i]) {
                return true;
            }
        }
        return false;
    }
}