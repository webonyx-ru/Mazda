var checkbox = $('input:checkbox');

checkbox.length > 0 && checkbox.each(function () {
    var $this = $(this);
    if($this.hasClass('no-style'))
        return;
    var e = $this.attr("class");
    $this.wrap('<div class="jq-checkbox"></div>'), $this.after('<div class="jq-checkbox__div"></div>'), $this.parent().addClass(e);
});

var radio = $('input:radio');

radio.length > 0 && radio.each(function () {
    var $this = $(this);
    if($this.hasClass('no-style'))
        return;
    var e = $this.attr("class");
    $this.wrap('<div class="jq-radio"></div>'), $this.after('<div class="jq-radio__div"></div>'), $this.parent().addClass(e);
});