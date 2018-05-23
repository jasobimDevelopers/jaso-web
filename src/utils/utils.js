import PhotoSwipe from 'photoswipe';
import PhotoSwipeUIdefault from 'photoswipe/dist/photoswipe-ui-default';
import { setFileRoot } from '@/filters';

export function zeroFull(str) {
  return str >= 10 ? str : `0${str}`;
}

export function getMonthCount(year, month) {
  const d = new Date(year, month, 0);
  return d.getDate();
}

export function showGallery(pictures, e, i) {
  e.preventDefault();
  e.stopPropagation();
  const pswpElement = document.querySelectorAll('.pswp')[0];
  const length = document.body.clientWidth;

  const items = pictures.map(p => ({
    src: setFileRoot(p),
    w: length,
    h: length,
    doGetSlideDimensions: true,
  }));

  const options = {
    index: i,
    shareEl: false,
    bgOpacity: 0.5,
  };

  const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUIdefault, items, options);

  function getSlideDimensions(slide) {
    // make sure we don't keep requesting the image if it doesn't exist etc.
    if (!slide.doGetSlideDimensions) {
      return;
    }

    const img = new Image();

    img.onerror = () => {
      slide.doGetSlideDimensions = false;
    };

    img.onload = () => {
      slide.doGetSlideDimensions = false;

      slide.w = img.naturalWidth;
      slide.h = img.naturalHeight;

      gallery.invalidateCurrItems();
      gallery.updateSize(true);
    };

    img.src = slide.src;
  }

  gallery.listen('gettingData', (index, slide) => {
    if (slide.doGetSlideDimensions) {
      setTimeout(
        // use setTimeout so that it runs in the event loop
        () => {
          getSlideDimensions(slide);
        }, 300,
      );
    }
  });

  gallery.listen('imageLoadComplete', (index, slide) => {
    if (slide.doGetSlideDimensions) {
      getSlideDimensions(slide);
    }
  });

  gallery.init();
}
