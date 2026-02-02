import { TAppContainerProps } from '.'
import { TLayerContainer } from '../contexts/layer'

export function TAppContainer(p: TAppContainerProps) {
    return <TLayerContainer>{p.children}</TLayerContainer>
}
