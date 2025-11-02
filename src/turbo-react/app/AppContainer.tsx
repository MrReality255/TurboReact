import { TAppContainerProps } from ".";
import { LayerContainer } from "../contexts/layer";

export function AppContainer(p: TAppContainerProps) {
  return <LayerContainer>{p.children}</LayerContainer>;
}
