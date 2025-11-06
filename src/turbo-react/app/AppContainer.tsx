import { TAppContainerProps } from ".";
import { TLayerContainer } from "../contexts/layer";

export function AppContainer(p: TAppContainerProps) {
  return <TLayerContainer>{p.children}</TLayerContainer>;
}
