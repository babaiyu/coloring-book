import React from 'react';
import PaintingBody from './Painting.body';
// import PaintingFooter from './Painting.footer';
// import PaintingFooterPalette from './Painting.footer.palette';
// import PaintingFooterBrush from './Painting.footer.brush';

export default function Painting() {
  return (
    <>
      <PaintingBody />
      {/* <Suspense fallback={<></>}>
        <PaintingFooter />
      </Suspense> */}

      {/* Footer tools */}
      {/* <Suspense fallback={<></>}>
        <PaintingFooterPalette />
      </Suspense>
      <Suspense fallback={<></>}>
        <PaintingFooterBrush />
      </Suspense> */}
    </>
  );
}
