export interface CacheProtocol {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
}
