var $cursor = $('<span />').html('&#9608;').addClass('blink cursor');
var HEADLINE = 'HACKING HARVARD';
var BYLINE = 'BY SAMUEL Y. WEINSTOCK AND DEV A. PATEL';
var SKIP = false;
var FADE_TIME = 1000;

$(document).ready(function() {
    var $statue = $('#statue');
    typeString($('#logo'), 'THE HARVARD CRIMSON', 0, 100, $cursor, type_headline);
    $(window).keypress(function() {
        SKIP = true;
    });
});

function empty($cursor) {
    $('#skip').remove();
    var $bin_txt = $('#binary-text');
    if (SKIP) {
        $('#headline-wrapper').fadeOut(FADE_TIME);
        $('#content').fadeIn(FADE_TIME).promise().done(function() {
            while ($bin_txt.height() < 2 * $(window).height()) {
                console.log('gogo!');
                scroll_binary();
            }
            setInterval(scroll_binary, 50);
        });
    }
    else {
        setInterval(scroll_binary, 50);
        setTimeout(function() {
            $('#content').fadeIn(FADE_TIME);
            $('#headline-wrapper').fadeOut(FADE_TIME);
        }, 3800);
    }
}

function type_byline($cursor) {
    $('.cursor').remove();
    $('#byline').prepend($cursor.clone().css('color', 'rgba(0,0,0,0)').removeClass('blink'));
    if (!SKIP) {
        setTimeout(function() {
            typeString($('#byline'), BYLINE, 0, 100, 
                $cursor, empty);
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

    // Generate line:
    var line = "";
    var cut_off = (1 - space_prob) * balance;
    var rand = 0;
    for (var i = 0; i < 300; i++) {
        rand = Math.random();
        if (rand > (1 - space_prob)) {
            line += "&nbsp;";
            cut_off = (1 - space_prob) * balance;
        }
        if (rand >= cut_off) {
            line += "1";
            if (cut_off < 0.5)
                cut_off = (1 - space_prob) * balance;
            cut_off += 0.1;
        }
        else {
            line += "0";
            if (cut_off > 0.5)
                cut_off = (1 - space_prob) * balance;
            cut_off -= 0.1;
        }

    }

    $("#binary-text").append(line + "<br>");
}
