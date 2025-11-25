import Hls, {
  type FragmentLoaderContext,
  type HlsConfig,
  type Loader,
  type LoaderCallbacks,
  type LoaderConfiguration,
} from "hls.js";
import { rewriteEngineUrl } from "./rewriteEngineUrl";

export class CustomFragmentLoader implements Loader<FragmentLoaderContext> {
  private loader: Loader<FragmentLoaderContext>;

  constructor(config: HlsConfig) {
    const DefaultLoader = Hls.DefaultConfig.loader;
    this.loader = new DefaultLoader(config) as Loader<FragmentLoaderContext>;
  }

  get stats() {
    return this.loader.stats;
  }

  get context() {
    return this.loader.context;
  }

  destroy() {
    this.loader.destroy();
  }

  abort() {
    this.loader.abort();
  }

  load(
    context: FragmentLoaderContext,
    config: LoaderConfiguration,
    callbacks: LoaderCallbacks<FragmentLoaderContext>
  ) {
    context.url = rewriteEngineUrl(context.url);
    this.loader.load(context, config, callbacks);
  }
}
