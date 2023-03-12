import { UiExtension } from '@web/ui-extension';

const SLIDER = [
  '/images/landingpage/landing_img1.webp',
  '/images/landingpage/landing_img2.webp',
];
export default function TestSimpleSlider() {
  return (
    <div>
      <UiExtension uiId="SIMPLE_SLIDER" images={SLIDER} ratio={1.5} />
    </div>
  );
}
