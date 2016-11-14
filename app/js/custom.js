var doc = $(document);
var menu_activated = false;

doc.ready(function () {
    setTimeout(function () {
        $('select.selectpicker').selectpicker();
    }, 300);


    doc.on('click', '[data-call-submenu]', function (e) {
        var _this = $(this);
        var bl = $('[data-submenu="' + _this.attr("data-call-submenu") + '"]');

        if (!_this.hasClass('active')) {
            _this.addClass('active');
            bl.show().addClass('active');
        } else {
            _this.removeClass('active');
            bl.hide().removeClass('active');
        }


        menu_activated = true;
        e.preventDefault();
    });

    doc.on('click', '.js-show-all-params', function (e) {
        var $this = $(this),
            filter = $('.full-filter-hidden');

        if ($this.hasClass('active')) {
            filter.slideUp(300);
            $this.removeClass('active');
        } else {
            filter.slideDown(300);
            $this.addClass('active');
        }

        e.preventDefault();
    });

    $('.owl-carousel__parent-element').each(function () {
        var $this = $(this);
        var similar_next = $this.find('.custom-carouse__next');
        var similar_prev = $this.find('.custom-carouse__prev');

        var owl = $this.find('.owl-carousel');

        var items_num = parseInt(owl.attr("data-items"));

        if (items_num > 0) {
            owl.owlCarousel({
                items: items_num,
                responsive: {
                    0: {
                        items: items_num
                    }
                }
            })
        } else {
            owl.owlCarousel({
                items: 3,
                responsive: {
                    0: {
                        items: 3
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

    $('[data-js-hide]').on('click', function (e) {
        $(this).closest('[data-js-hide-block]').hide();
        e.preventDefault();
    });

    $('[data-jsp]').jScrollPane();

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

    $('.toggle-show-pass__checkbox').on('change', function() {
        var $el = $(this);
        if ($el.is(':checked')) {
            $el.closest('.entry-field').find('.input-password').attr('type', 'text')
        }
        else {
            $el.closest('.entry-field').find('.input-password').attr('type', 'password')
        }
    });

});