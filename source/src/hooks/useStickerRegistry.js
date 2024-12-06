import { useMemo } from "react";
import vscodePurple from "@/data/stickerConfigs/vscodePurple";
import vscodeBlue from "@/data/stickerConfigs/vscodeBlue";

export const useStickerRegistry = () => {
  const registry = useMemo(
    () => ({
      vscodePurple,
      vscodeBlue,
    }),
    []
  );

  return registry;
};
