import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class Monster extends Document {
  render() {
    return (
      <Html lang="es">
        <title>MonsterMC</title>
        <Head>
          <body></body>
          <meta charset="UTF-8" />
          <link
            rel="icon"
            type="image/svg+xml"
            href="../../public/monster.svg"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            http-equiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          />
          <meta
            name="description"
            content="This is history of bans and mutes of MonsterMC"
          />
          <meta name="author" content="MonsterMC" />
          <meta name="theme-color" content="#000000" />
        </Head>
        <body>
          <div id="root"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Monster;
