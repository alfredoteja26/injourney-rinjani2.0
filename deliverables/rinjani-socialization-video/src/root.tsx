import {Composition} from "remotion";
import {RinjaniSocialization} from "./RinjaniSocialization";

export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;
export const VIDEO_FPS = 30;
export const VIDEO_DURATION_FRAMES = 1800;

export const Root = () => {
  return (
    <Composition
      id="RinjaniSocialization"
      component={RinjaniSocialization}
      durationInFrames={VIDEO_DURATION_FRAMES}
      fps={VIDEO_FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
      defaultProps={{}}
    />
  );
};
