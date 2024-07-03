import { CacheProtocol } from "@/application/protocols/cache.protocol";
import { CacheAdapter } from "@/infrastructure/cache.adapter";

export const cacheAdapterFactory = (): CacheProtocol => {
  return new CacheAdapter();
};
