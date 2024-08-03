const path = require('path');

module.exports = {
    // Other configurations...
    resolve: {
        fallback: {
            "url": require.resolve("url/")
        }
    },
    // Additional configurations like entry, output, etc.
};
