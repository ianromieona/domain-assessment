module.exports = {
    plugins: [
        require("@tailwindcss/postcss")({
            // Any additional Tailwind configuration options go here
        }),
        require("autoprefixer"),
        require("postcss-flexbugs-fixes"),
        require("postcss-preset-env"),
    ],
};
