import Head from 'next/head';

export default function MetaTags() {
    return (
        <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title key='pageTitle'>Game Metadata</title>
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
            <meta name="robots" content="noindex"/>
            {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,600"/> */}
            <link rel="apple-touch-icon-precomposed" sizes="57x57" href="https://images.nexusmods.com/favicons/ReskinOrange/apple-touch-icon-60x60.png"/>
            <link rel="apple-touch-icon-precomposed" sizes="114x114" href="https://images.nexusmods.com/favicons/ReskinOrange/apple-touch-icon.png"/>
            <link rel="apple-touch-icon-precomposed" sizes="72x72" href="https://images.nexusmods.com/favicons/ReskinOrange/apple-touch-icon-76x76.png"/>
            <link rel="apple-touch-icon-precomposed" sizes="144x144" href="https://images.nexusmods.com/favicons/ReskinOrange/apple-touch-icon.png"/>
            <link rel="apple-touch-icon-precomposed" sizes="60x60" href="https://images.nexusmods.com/favicons/ReskinOrange/apple-touch-icon-60x60.png"/>
            <link rel="apple-touch-icon-precomposed" sizes="120x120" href="https://images.nexusmods.com/favicons/ReskinOrange/apple-touch-icon-120x120.png"/>
            <link rel="apple-touch-icon-precomposed" sizes="76x76" href="https://images.nexusmods.com/favicons/ReskinOrange/apple-touch-icon-76x76.png"/>
            <link rel="apple-touch-icon-precomposed" sizes="152x152" href="https://images.nexusmods.com/favicons/ReskinOrange/apple-touch-icon-152x152.png"/>
            <link rel="shortcut icon" sizes="196x196" href="https://images.nexusmods.com/favicons/ReskinOrange/firefox_app_128x128.png"/>
            <link rel="shortcut icon" sizes="96x96" href="https://images.nexusmods.com/favicons/ReskinOrange/firefox_app_128x128.png"/>
            <link rel="shortcut icon" sizes="230x230" href="https://images.nexusmods.com/favicons/ReskinOrange/favicon-230x230.png"/>
            <link rel="shortcut icon" sizes="32x32" href="https://images.nexusmods.com/favicons/ReskinOrange/favicon-32x32.png"/>
            <link rel="shortcut icon" sizes="16x16" href="https://images.nexusmods.com/favicons/ReskinOrange/favicon-16x16.png"/>
            <link rel="shortcut icon" href="https://images.nexusmods.com/favicons/ReskinOrange/favicon.ico"/>
            <meta property="og:title" content="Game Metadata" key='title' />
            <meta property="og:site_name" content="Nexus Mods" />
            <meta property="og:locale" content="en_GB" />
            <meta property="og:type" content="website" />
            {/* <meta property="og:description" content="The official Discord bot for NexusMods.com" /> */}
            {/* <meta property="og:url" content="https://discordbot.nexusmods.com" /> */}
            {/* <meta property="og:image" content="https://images.nexusmods.com/oauth/applications/api_app_logo_1598554289_php9fzf1a.png" /> */}
            {/* <meta property="og:image:alt" content="A Nexus Mods logo, a green arrow and a Discord logo symbolising the link between the two services." /> */}
            <meta name="twitter:card" content="summary" />
            <meta name="theme-color" content="#da8e35" />
        </Head>
    )
}