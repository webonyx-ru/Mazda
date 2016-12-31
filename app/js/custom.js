var doc = $(document);
var menu_activated = false;

doc.ready(function () {
    setTimeout(function () {
        $('select.selectpicker').selectpicker();
    }, 300);


    doc.on('click', '[data-call-submenu]', function (e) {
        var _this = $(this);
        var bl = _this.siblings('[data-submenu]');

        if (!_this.hasClass('active')) {
            $('[data-call-submenu]').removeClass('active');
            $('[data-submenu]').hide().removeClass('active');
            _this.addClass('active');
            bl.show().addClass('active');
            menu_activated = true;
        } else {
            _this.removeClass('active');
            bl.hide().removeClass('active');

            menu_activated = false;
        }
        e.preventDefault();
    });

    doc.on('click', function (e) {
        if (menu_activated == false)
            return;
        var target = $(e.target);
        if(!target.hasClass('header-menu__link')
            && target.closest('.header-menu__item').length < 1)
        {
            $('[data-call-submenu]').removeClass('active');
            $('[data-submenu]').hide().removeClass('active');
            menu_activated = false;
        }
    });

    doc.on('click', '.js-show-all-params', function (e) {
        var $this = $(this),
            filter = $('.full-filter-hidden'),
            $text = $this.find('.js-all-params-text');

        if ($this.hasClass('active')) {
            filter.slideUp(300);
            $this.removeClass('active');
            $text.text('Все параметры');
        } else {
            filter.slideDown(300);
            $this.addClass('active');
            $text.text('Скрыть параметры');
        }

        e.preventDefault();
    });

    $('.owl-carousel__parent-element').each(function () {
        var $this = $(this);
        var similar_next = $this.find('.custom-carouse__next');
        var similar_prev = $this.find('.custom-carouse__prev');


        var owl = $this.find('.owl-carousel');

        owl.each(function () {
            var items_num = parseInt($(this).attr("data-items"));
            // console.log(items_num)
            if (!items_num > 0) {
                $(this).owlCarousel({
                    items: 3,
                    responsive: {
                        0: {
                            items: 1
                        },
                        768: {
                            items: 3
                        }
                    }
                });
            } else {
                $(this).owlCarousel({
                    items: items_num,
                    responsive: {
                        0: {
                            items: 1
                        }
                    }
                });
            }

            similar_next.on('click', function (e) {
                $(this).closest('.owl-carousel__parent-element').find('.owl-carousel:visible').trigger('next.owl.carousel');
                e.preventDefault()
            });

            similar_prev.on('click', function (e) {
                $(this).closest('.owl-carousel__parent-element').find('.owl-carousel:visible').trigger('prev.owl.carousel');
                e.preventDefault()
            });
        });

    });

    $('.auto-slider.owl-carousel').each(function () {
        var owl = $(this);

        owl.owlCarousel({
            dots: true,
            items: 1,
            onInitialized: thumbInit
        });

        function thumbInit(event) {
            $(event.target).find('.owl-item').each(function () {
                var thumb = $(this).children().attr('data-thumb');
                var i = $(this).index();

                $(event.target).find('.owl-dot:eq(' + i + ')').html(thumb);
            });
        }
    });

    $('[data-js-hide]').on('click', function (e) {
        $(this).closest('[data-js-hide-block]').hide();
        e.preventDefault();
    });

    $('.dealers-map__current-dealer-name').bind("DOMSubtreeModified", function () {
        var header = $('.dealers-map__listing-header'),
            listing = $('.dealers-map__listing'),
            block = $('.dealers-map__units'),
            throttleTimeout,
            api = block.data('jsp'),
            top = -(listing.offset().top -
            (header.offset().top
            + header.outerHeight()));

        block.css({top: top});

        if (!throttleTimeout) {
            throttleTimeout = setTimeout(
                function () {
                    api.reinitialise();
                    throttleTimeout = null;
                },
                50
            );
        }
    });

    $('.toggle-show-pass__checkbox').on('change', function () {
        var $el = $(this);
        if ($el.is(':checked')) {
            $el.closest('.entry-field').find('.input-password').attr('type', 'text')
        } else {
            $el.closest('.entry-field').find('.input-password').attr('type', 'password')
        }
    });

    doc.on('click', '.companies-map__item-header', function (e) {
        e.preventDefault();

        var $this = $(this);
        var item = $this.closest('.companies-map__item');

        if (item.hasClass('active')) {
            item.removeClass('active');
        } else {
            item.siblings().removeClass('active');
            item.addClass('active');
        }

        setTimeout(function () {
            item.closest('[data-jspane]').data('jsp').reinitialise();
        }, 100)
    });

    $(function () {
        var news_grid = {};
        var ww = viewport().width;
        var initialized = false;

        news_grid.container = $('.main-page__news-grid, .mobile-owl-carousel__single');
        news_grid.owl = news_grid.container.find('>.row');

        // console.log(news_grid.owl_delaers.attr('data'));

        $(window).bind('resize', function () {
            ww = viewport().width;

            if (ww < 768 && initialized != true) {
                news_grid.owl.css({margin: 0}).addClass('owl-carousel').owlCarousel({
                    items: 1
                });

                initialized = true;
            } else if (ww >= 768 && initialized == true) {
                initialized = false;

                news_grid.owl.trigger('destroy.owl.carousel').removeClass('owl-carousel');
            }
        });
    });

    doc.on('click', '.js-dealers-filter__hidden-blocks-trigger', function () {
        var $this = $(this);
        var $parent = $this.closest('.js-dealers-filter__parent');

        if(!$this.hasClass('active')) {
            $this.addClass('active');
            $parent.addClass('show-hidden-elements');
        } else {
            $this.removeClass('active');
            $parent.removeClass('show-hidden-elements');
        }
    });
});

$(function () {
    var char = {};
    var ww = $(window).width();

    char.models_wrapper = '.auto-model__characters-tab__pags-wrapper';
    char.models_link = '.auto-model__modification-element-link';
    char.back_link = '[data-modification-go-back]';
    char.content_wrapper = '.auto-model__characters-tab__wrapper';


    // открываем полные характеристики
    char.open = function () {
        // console.log('open');

        $(char.models_wrapper).fadeOut(300, function () {
            // тут можем сделать ajax на доставание информации о моделях
            $(char.content_wrapper).fadeIn(300);
        });
    };

    // закрываем полные характеристики
    char.close = function () {
        // console.log('close');
        $(char.content_wrapper).fadeOut(300, function () {
            $(char.models_wrapper).fadeIn(300);
        });
    };

    // отчищаем полные характеристики
    char.clear = function () {
        $(char.content_wrapper).removeAttr('style');
        $(char.models_wrapper).removeAttr('style');
    };

    doc.on('click', char.back_link, function (e) {
        if (ww >= 768)
            return;
        e.preventDefault();

        char.close();
    });

    doc.on('click', char.models_link, function (e) {
        if (ww >= 768)
            return;
        e.preventDefault();

        char.open();
    });

    $(window).bind('resize', function () {
        ww = viewport().width;
        if (ww >= 768) {
            char.clear();
        }
    });

    $(".modal-lg-nav__link").on('click', function (e) {
        if ($(this).siblings(".panel-collapse").hasClass('in')) {
            e.stopPropagation();
            e.preventDefault();
        }
    });
});

$(function () {
    var accordion = {};
    accordion.parent = $('[data-mobile-accordion="parent"]');
    accordion.header = accordion.parent.find('.accordion-header');


    accordion.toggle = function (current, siblings) {
        if (current.hasClass('mobile-active')) {
            current.removeClass('mobile-active').next('.tab-pane').removeClass('mobile-active');
        } else {
            siblings.removeClass('mobile-active');
            current.addClass('mobile-active');
            current.next('.tab-pane').addClass('mobile-active')
        }
    };

    accordion.header.on('click', function (e) {
        e.preventDefault();

        var current = $(this);
        var siblings = current.siblings();

        accordion.toggle(current, siblings);
    });
});

function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {width: e[a + 'Width'], height: e[a + 'Height']};
}

doc.on('show.bs.modal', function (e) {
    $(window).resize();
});

doc.on('show.bs.collapse', function () {
    $(window).resize();
});

$(window).resize(function () {

    $('[data-jspane]').each(function () {
        var api = $(this).data('jsp');
        // clearTimeout(throttleTimeout);
        var throttleTimeout;
        // if (!throttleTimeout) {
        throttleTimeout = setTimeout(
            function () {
                api.reinitialise();
                // cleanTimeout(throttleTimeout);
            },
            200
        );
        // }
    });

});

$(window).on('load', function () {
    $('[data-jspane]').jScrollPane({
        contentWidth: '0px'
    });
    $(window).resize();
});