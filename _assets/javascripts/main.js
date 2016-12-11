(function () {

    window.browser_supports_webp = !1;
    if ("undefined" == typeof window.supported_wbp || "" === window.supported_wbp) {
      window.photoset_supports_webp = !1;
    } else {
      window.photoset_supports_webp = !!window.supported_wbp
    }


    WebP = new Image;
    WebP.onload = WebP.onerror = function() {
      return 2 !== WebP.height ? window.browser_supports_webp = !1 : window.browser_supports_webp = !0
    }

    WebP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";


  var _arrangeGrid = function () {
    $('.photo-set').each(function (index, set) {
      var images = $(set).find('.picture-wrap');
      var photoSetWidth = $(this).width();
      var ratios = [], margins = 0;
      images.each(function (index, obj) {
        ratios.push($(obj).data('ratio'));
        margins += 10;
      })
      var minRatio = Math.min.apply(Math, ratios);
      var j = 0;

      images.each(function (index, obj) {
        j += ratios[index] / minRatio
      });

      images.each(function (index, img) {
        var c = (photoSetWidth - margins) / j,
          img = $(this).find("img"),
          width = Math.ceil(c / minRatio) * ratios[index],
          height = Math.ceil(c / minRatio),
          imgSrc = img.attr('data-src'), requestedWidth = 1600, responsiveSrc;

        if (width > 1200) {
          requestedWidth = 1600
        } else if (width > 599 && width < 1000) {
          requestedWidth = 1200
        } else if (width > 300 && width < 599) {
          requestedWidth = 800
        } else if (width < 600 && width > 300) {
          requestedWidth = 800
        } else if (width < 400) {
          requestedWidth = 500
        }

        responsiveSrc = imgSrc.replace(/w_auto/, "c_scale,w_" + requestedWidth);

        if ($(document).width() > 765) {
          img.height(height).width(width);
          $(this).css({ 'flex-basis': width + 'px' });
          $(this).find('picture').height(height)
        } else {
          img.height('auto').width('100%');
        }

        if (browser_supports_webp) {
          responsiveSrc = responsiveSrc.replace(/jpg/, 'webp');
        }

        img.attr('data-original', responsiveSrc);
      });
    });
  }

  var _unveil = function () {
    $("img").lazyload({
      effect : "fadeIn"
    });
  }

  var _resize = function () {
    $(window).on('resize', _arrangeGrid);
  }

  _resize();
  _arrangeGrid();
  _unveil();

})();
