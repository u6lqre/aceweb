import Hls, {
  type FragmentLoaderContext,
  type HlsConfig,
  type LoaderCallbacks,
  type LoaderConfiguration,
  type LoaderContext,
} from "hls.js";
import { rewriteEngineUrl } from "./rewriteEngineUrl";

export class CustomFragmentLoader extends Hls.DefaultConfig.loader {
  constructor(config: HlsConfig) {
    super(config);
  }

  load(
    context: FragmentLoaderContext,
    config: LoaderConfiguration,
    callbacks: LoaderCallbacks<LoaderContext>
  ) {
    context.url = rewriteEngineUrl(context.url);

    super.load(context, config, callbacks);
  }
}
