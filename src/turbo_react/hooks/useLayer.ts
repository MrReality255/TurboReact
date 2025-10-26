import { useContext } from "react";
import { CtxLayerManager } from "../contexts/layer";

export function useLayer() {
    const r = useContext(CtxLayerManager)
    if (!r) {
        throw 'Missing CtxLayerRenderContext'
    }    
    return r
}