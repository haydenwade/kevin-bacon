const Hapi = require('hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

(async () => {

    const server = await new Hapi.server({
        host: '0.0.0.0',
        port: 3000
    });

    //register plugins
    const swaggerOptions = {
        info: {
            title: 'API Documentation',
            version: Pack.version,
        },
    };
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    //routes
    server.route(require('./src/routes/getDegreesOfSeparation'));
    server.route(require('./src/routes/populateGraph'));
    server.route(require('./src/routes/getGraph'));

    try {
        await server.start();
        console.log(`Server running at: ${server.info.uri}`);
    }
    catch (err) {
        console.log(err);
    }

})();
