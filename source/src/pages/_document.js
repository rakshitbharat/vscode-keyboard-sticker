import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name="description"
          content="World's first interactive keyboard sticker visualizer for VSCode shortcuts. Customize your keyboard with beautiful, themed stickers showing OS-specific VSCode commands."
        />
        <meta
          name="keywords"
          content="vscode, keyboard-stickers, visual-studio-code, keyboard-shortcuts, developer-tools"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
