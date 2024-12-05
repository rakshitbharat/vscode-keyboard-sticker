// Type definitions for sticker configurations
export interface StickerStyle {
  backgroundColor: string;
  color: string;
  fontSize: string;
  padding: string;
  borderRadius: string;
  border: string;
}

export interface OSStyle {
  style: StickerStyle;
  position: "top-right" | "top-left";
}

export interface KeyStickers {
  [key: string]: string[]; // key -> array of sticker texts
}

export interface StickerConfig {
  id: string;
  name: string;
  description: string;
  author: string;
  version: string;
  styles: {
    mac: OSStyle;
    windows: OSStyle;
    ubuntu: OSStyle;
  };
  layout: KeyStickers;
}
