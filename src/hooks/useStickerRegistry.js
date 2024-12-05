import { useMemo } from "react";
import vscodePurple from "@/data/stickerConfigs/vscodePurple";

export const useStickerRegistry = () => {
  const registry = useMemo(
    () => ({
      vscodePurple,
    }),
    []
  );

  return registry;
};
