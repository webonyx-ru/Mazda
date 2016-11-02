var doc = $(document);
var menu_activated = false;

doc.ready(function(){
   setTimeout(function () {
      $('select.selectpicker').selectpicker();
   }, 300);


   doc.on('click', '[data-call-submenu]', function (e) {
      var _this = $(this);
      var bl = $('[data-submenu="' + _this.attr("data-call-submenu") + '"]');

      if(!_this.hasClass('active')) {
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

      if($this.hasClass('active')) {
         filter.slideUp(300);
         $this.removeClass('active');
      } else {
         filter.slideDown(300);
         $this.addClass('active');
      }

      e.preventDefault();
   });

   var similar_slider = $('.similar-cars-slider .owl-carousel');

   similar_slider.owlCarousel({
      items: 3,
      responsive: {
         0: {
            items: 3
         }
      }
   });

   var similar_next = $('.similar-cars-slider .custom-carouse__next');
   var similar_prev = $('.similar-cars-slider .custom-carouse__prev');

   similar_next.on('click', function(e){
      similar_slider.trigger('next.owl.carousel');
      e.preventDefault()
   });
   similar_prev.on('click', function(e){
      similar_slider.trigger('prev.owl.carousel');
      e.preventDefault()
   });
});