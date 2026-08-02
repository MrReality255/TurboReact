import { useLayers } from "@mrreality255/turbo-react-forms";
import { TDemoAppProps } from "../DemoAppLayout";
import {
  TButton,
  THorizLayout,
  TPaletteProvider,
  TWindow,
} from "../../turbo-react";

import { DemoMobileMenuLayer } from "./DemoMobileMenuLayer";

export function DemoHeaderMobile(
  p: TDemoAppProps & { onNavigate: (url: string) => void },
) {
  const l = useLayers();
  return (
    <TWindow palette="dark" innerPadding="none" border="none" noShadow>
      <TPaletteProvider palette="blue">
        <THorizLayout
          gap={"1em"}
          left={
            <TButton onClick={() => toggleMenu()} variant="plain">
              Menu
            </TButton>
          }
        >
          TurboReact 1.0
        </THorizLayout>
      </TPaletteProvider>
    </TWindow>
  );

  function toggleMenu() {
    l.main.show((handle) => <DemoMobileMenuLayer {...p}></DemoMobileMenuLayer>);
  }
}
