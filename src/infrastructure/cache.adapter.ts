import { CacheProtocol } from "@/application/protocols/cache.protocol";

export class CacheAdapter implements CacheProtocol {
  private readonly cache: Map<string, string> = new Map();

  async get(key: string): Promise<string | null> {
    return this.cache.get(key) ?? null;
  }

  async set(key: string, value: string): Promise<void> {
    this.cache.set(key, value);
  }
}
