import type { BlockProperties } from "grapesjs";
import { Megaphone } from "lucide-static";

export const HeroBlock = (): BlockProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    label: t("hero"),
    media: Megaphone,
    content: `
    <mj-hero mode="fixed-height" height="470px" background-width="600px" background-url="https://placehold.co/600x400?text=Background%20Image" padding="100px 0">
      <mj-text align="center" font-size="3rem" line-height="1.15">
        ${t("heading")}
      </mj-text>
      <mj-button href="#" align="center">
        ${t("callToAction")}
      </mj-button>
    </mj-hero>`,
    activate: true,
  };
};
