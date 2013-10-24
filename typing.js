var $cursor = $('<span />').html('&#9608;').addClass('blink cursor');
var $bin_txt;
var HEADLINE = 'HACKING HARVARD';
var BYLINE = 'BY DEV A. PATEL AND SAMUEL Y. WEINSTOCK';
var SKIP = false;
var FINISHED = false;
var FADE_TIME = 2000;

$(document).ready(function() {
    var $statue = $('#statue');
    $bin_txt = $('#binary-text');
    typeString($('#header'), 'THE HARVARD CRIMSON', 0, 100, $cursor, type_headline);
    $(window).keydown(handle_click);
    document.addEventListener('touchstart', handle_click);
});

function handle_click () {
    if (FINISHED == true)
        empty();
    else
        SKIP = true;
}

function empty($cursor) {
    if (SKIP) {
        $('#headline-wrapper').fadeOut(FADE_TIME);
        $("#press-key").fadeOut(FADE_TIME);
        $('#content').fadeIn(FADE_TIME).promise().done(function() {
            while ($bin_txt.height() < $(window).height()) {
                scroll_binary();
            }
            setInterval(scroll_binary, 50);
            $("#header").addClass("animate-shadow");
        });
    }
    else {
        $('#headline-wrapper').fadeOut(FADE_TIME);
        $("#press-key").fadeOut(FADE_TIME);
        $('#content').fadeIn(FADE_TIME, function(){
            $("#header").addClass("animate-shadow");
        });
    }
    $('#timeline').timelinexml({ src : $('.timeline-html-wrap') });
}

function intro_done() {
    FINISHED = true;
    setInterval(scroll_binary, 50);
    setTimeout(handle_click, 9000);
}

function type_byline($cursor) {
    $('.cursor').remove();
    $('#byline').prepend($cursor.clone().css('color', 'rgba(0,0,0,0)').removeClass('blink'));
    if (!SKIP) {
        setTimeout(function() {
            typeString($('#byline'), BYLINE, 0, 100, 
                $cursor, intro_done);
        }, 500);
    }
    else {
        typeString($('#byline'), BYLINE, 0, 100, $cursor, empty);
    }
}

function type_headline($cursor) {
    $('#headline').prepend($cursor.clone().css('color', 'black').removeClass('blink'));
    if (!SKIP) {
        setTimeout(function() {
            typeString($('#headline'), HEADLINE, 0, 100, 
                $cursor, type_byline);
        }, 500); 
    }
    else {
        typeString($('#headline'), HEADLINE, 0, 100, $cursor, type_byline);
    }
}

function typeString($target, str, pos, delay, $cursor, cb) {
    if (SKIP) {
        $target.append($cursor).find('.text').html(str);
        cb($cursor);
        return;
    }
    $target.append($cursor).find('.text').html(str.substring(0, pos + 1));
    if (pos < str.length - 1) {
        setTimeout(function () {
            typeString($target, str, pos + 1, delay, $cursor, cb);
        }, delay);
    }
    else {
        $target.append($cursor);
        cb($cursor);
    }
}

function scroll_binary() {
    // CONFIGURABLES:
    var balance = 0.5; // Balance between 1's and 0's
    var space_prob = 0.05; // Probability for spaces to appear
    var penalty = 0.08; // Percent 1 or 0 is punished after each
                        // repeated appearance

    // Generate line:
    var line = "";
    var center = (1 - space_prob) * balance;
    var cut_off = center;
    var rand = 0;
    for (var i = 0; i < 300; i++) {
        rand = Math.random();
        if (rand > (1 - space_prob)) {
            line += "&nbsp;";
            cut_off = center;
        }
        else if (rand >= cut_off) {
            line += "1";
            if (cut_off < center)
                cut_off = center;
            cut_off += penalty * (1 - space_prob);
        }
        else {
            line += "0";
            if (cut_off > center)
                cut_off = center;
            cut_off -= penalty * (1 - space_prob);
        }
    }

    // Pop hidden rows
    // + 10 prevents yanking a line that's half-off prematurely
    if ($bin_txt.height() > $(window).height() + 10) {
        $bin_txt.children(":first").remove();
    }

    $bin_txt.append("<span>" + line + "<br></span>");
}
