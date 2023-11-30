/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                'xs': '370px',
            },
            colors: {
                gray: {
                    50: "#FAFAFA",
                    100: "#F5F5F5",
                    200: "#EEEEEE",
                    300: "#E0E0E0",
                    400: "#BDBDBD",
                    500: "#9D9D9D",
                    600: "#716F6F",
                    700: "#5C5C5C",
                    800: "#373737",
                    900: "#222222",
                    950: "#1A1A1A",
                },
                accent: {
                    50: 'var(--kui-accent50)',
                    100: 'var(--kui-accent100)',
                    200: 'var(--kui-accent200)',
                    300: 'var(--kui-accent300)',
                    400: 'var(--kui-accent400)',
                    500: 'var(--kui-accent500)',
                    600: 'var(--kui-accent600)',
                    700: 'var(--kui-accent700)',
                    800: 'var(--kui-accent800)',
                    900: 'var(--kui-accent900)',
                },
                primary: "var(--kui-primary)",
                primaryOpaque: "var(--kui-primaryOpaque)",
                primaryDarkOpaque: "var(--kui-primaryDarkOpaque)",
                secondary: "var(--kui-secondary)",
                secondaryActive: "var(--kui-secondaryActive)",
                secondaryOpaque: "var(--kui-secondaryOpaque)",
                primaryFont: "var(--kui-primaryFont)",
                primaryLightfont: "var(--kui-primaryLightfont)",
                lightOpaque: "var(--kui-lightOpaque)",
                opaque: "var(--kui-opaque)",
                opaqueActive: "var(--kui-opaqueActive)",
            },
        },
    },
    plugins: [],
}
