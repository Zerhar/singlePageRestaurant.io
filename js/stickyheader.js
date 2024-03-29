var stickyHeaders = (function () {

    var $window = $(window),
        $stickies;

    var load = function (stickies) {

        if (typeof stickies === "object" && stickies instanceof jQuery && stickies.length > 0) {

            $stickies = stickies.each(function () {

                var $thisSticky = $(this).wrap('<div class="followWrap" />');

                $thisSticky
                    .data('originalPosition', $thisSticky.offset().top)
                    .data('originalHeight', $thisSticky.outerHeight())
                    .parent()
                    .height($thisSticky.outerHeight());
            });

            $window.off("scroll.stickies").on("scroll.stickies", function () {
                _whenScrolling();
            });
        }
    };

    var _whenScrolling = function () {

        $stickies.each(function (i) {

            var $thisSticky = $(this),
                $stickyPosition = $thisSticky.data('originalPosition');

            if ($stickyPosition <= $window.scrollTop()) {

                var $nextSticky = $stickies.eq(i + 1),
                    $nextStickyPosition = $nextSticky.data('originalPosition') - $thisSticky.data('originalHeight');

                $thisSticky.addClass("fixed");

                if ($nextSticky.length > 0 && $thisSticky.offset().top >= $nextStickyPosition) {

                    $thisSticky.addClass("absolute").css("top", $nextStickyPosition);
                }

            } else {

                var $prevSticky = $stickies.eq(i - 1);

                $thisSticky.removeClass("fixed");

                if ($prevSticky.length > 0 && $window.scrollTop() <= $thisSticky.data('originalPosition') - $thisSticky.data('originalHeight')) {

                    $prevSticky.removeClass("absolute").removeAttr("style");
                }
            }
        });
    };

    return {
        load: load
    };
})();

$(function () {
    $('.display-4, #subHeader').css('display', 'block');
    $('.display-4, #subHeader').animate({ opacity: 0 }, 0);
    $('.display-4').delay(400).animate({ opacity: 1, top: "-50px" }, '1000', function () {
        $('#subHeader').animate({ opacity: 1, top: "-50px" }, '500');
    });
    stickyHeaders.load($(".followMeBar"));
    $('html').smoothScroll();
});
