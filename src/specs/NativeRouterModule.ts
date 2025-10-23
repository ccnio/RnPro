import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface PathInfo {
  path: string;
  user: User;
}

export type User = {name: string; email: string};

export interface PageRet {
  exists: boolean;
  title?: string;
  router?: Router;
}

export interface Router {
  schema: string;
  host: string;
}

export interface Spec extends TurboModule {
  goPage(path: string): void;

  hasPage(pathInfo: PathInfo): Promise<PageRet>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeRouterModule');
