var doc = $(document);
var menu_activated = false;

doc.ready(function(){
   $('select.selectpicker').selectpicker();
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
});