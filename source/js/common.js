jQuery(function ($) {

// -----------------  Гамбургер  --------------------
  $(".mobile-burger").click(function (event) {
    $(".mobile-menu").toggleClass("mobile-menu--active"),
    $(".mobile-burger").toggleClass("mobile-burger--active"),
    $("body").toggleClass("body--fixed")
    $(".header-acc").removeClass("header-acc--active");
  });

  $(".header-search").click(function () {
    $(".search-form").toggleClass("search-form--active");
    $(".header-acc").removeClass("header-acc--active");
  });

  $(".header-exit").click(function () {
    $(".header-acc").toggleClass("header-acc--active"),
    $(".search-form").removeClass("search-form--active");
  });

  $(".header-acc__exit").click(function () {
    $(".header-acc").toggleClass("header-acc--active");
  });

  $('select').niceSelect();

  const Sliders = {
    NEW_SLIDER: {
      ELEMENT: $(".news-article__images"),
      SETTINGS: {
        accessibility: true,
        arrows: false,
        dots: false,
        speed: 1500,
        centerMode: true,
        slidesToShow: 2,
        infinite: true,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              centerMode: true,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              slidesToScroll: 1,
            },
          },
        ],
      },
      // BREAKPOINT: 1600,
      // CLASSNAME: '',
    },
    LAST: {
      ELEMENT: $('.last-slider'),
      SETTINGS: {
        accessibility: true,
        arrows: true,
        dots: false,
        speed: 500,
        slidesToShow: 4,
        prevArrow: $('.left-arrow'),
        nextArrow: $('.right-arrow'),
        responsive: [{
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            arrows: false,
          },
        },
        {
          breakpoint: 992,
          settings: {
            arrows: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            // variableWidth: true
          },
        },
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            // variableWidth: true
          },
        },
        {
          breakpoint: 575,
          settings: {
            arrows: false,
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            variableWidth: false,
          },
        },
      ],
      },
      // BREAKPOINT: OFF_SLIDER,
      CLASSNAME: '',
    }
  }


  function initialazeSlickSlider(slider) {
    const {
      BREAKPOINT,
      SETTINGS,
      ELEMENT
    } = slider;
    (document.documentElement.clientWidth <= BREAKPOINT || BREAKPOINT === undefined) && ELEMENT.slick(SETTINGS);
  }

  function toggleSlider(slider) {
    const {
      BREAKPOINT,
      ELEMENT,
      SETTINGS
    } = slider;
    document.documentElement.clientWidth > BREAKPOINT && ELEMENT.hasClass('slick-initialized') && ELEMENT.slick('unslick');
    document.documentElement.clientWidth <= BREAKPOINT && !ELEMENT.hasClass('slick-initialized') && ELEMENT.slick(SETTINGS);
  }

  function toggleExtraClass(slider) {
    const {
      BREAKPOINT,
      ELEMENT,
      CLASSNAME
    } = slider;
    document.documentElement.clientWidth > BREAKPOINT && !ELEMENT.hasClass(CLASSNAME) && ELEMENT.addClass(CLASSNAME);
    document.documentElement.clientWidth <= BREAKPOINT && ELEMENT.hasClass(CLASSNAME) && ELEMENT.removeClass(CLASSNAME);
  }

  initialazeSlickSlider(Sliders.LAST);
  initialazeSlickSlider(Sliders.NEW_SLIDER);
});


$(document).on('click', '.accordion', function () {
  var those = this;
  if ($(those).hasClass('accordion__active')) {
      $(those).removeClass('accordion__active').closest('.program-item').find('.panel').slideUp('200');
  } else {
      $(those).closest('.program-list').find('.accordion__active').removeClass('accordion__active').siblings('.panel').slideUp('200');

      if ($(those).attr('data-id')) {
          var data = {
              action: 'add_program_to_user',
              id: $(those).attr('data-id')
          };

          $.ajax({
              type: "POST",
              url: functions.ajaxurl,
              data: data,
              success: function (response) {
                  if (response.success) {
                      $(those).addClass('accordion__active').removeAttr('data-id').closest('.program-item').find('.panel').slideDown('200');

                  }
              }
          });
      } else {
          $(those).addClass('accordion__active').closest('.program-item').find('.panel').slideDown('200');
      }
  }
});
