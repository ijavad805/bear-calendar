const postcss = require("rollup-plugin-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
module.exports = {
    rollup(config, options) {
        config.plugins.push(
            postcss({
                plugins: [
                    autoprefixer(),
                    cssnano({
                        preset: "default",
                    }),
                    require('postcss-assets')({
                      loadPaths: ['**'], // Specify the paths where your images are located
                    }),
                ],
                inject: true,
                // only write out CSS for the first bundle (avoids pointless extra files):
                extract: !!options.writeMeta,
            }),
        );
        return config;
    },
};
