var $cursor = $('<span />').html('&#9608;').addClass('blink cursor');

$(document).ready(function() {
    var $statue = $('#statue');
    typeString($('#logo'), 'THE HARVARD CRIMSON', 0, 100, $cursor, type_headline);
});

function empty($cursor) {
    setInterval(scroll_binary, 50);
    setTimeout(function() {
        $('#content').fadeIn();
        $('#headline').fadeOut();
        $('#byline').fadeOut();
    }, 1800);
}

function type_byline($cursor) {
    $('.cursor').remove();
    $('#byline').prepend($cursor.clone().css('color', 'rgba(0,0,0,0)').removeClass('blink'));
    console.log('prepended cursor copy to byline');
    setTimeout(function() {
        typeString($('#byline'), 'BY SAM WEINSTOCK AND DEV PATEL', 0, 100, 
            $cursor, empty);
    }, 500);
}

function type_headline($cursor) {
    $('#headline').prepend($cursor.clone().css('color', 'black').removeClass('blink'));
    setTimeout(function() {
        typeString($('#headline'), 'HACKING HARVARD', 0, 100, 
            $cursor, type_byline);
    }, 500); 
}

function typeString($target, str, pos, delay, $cursor, cb) {
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
    for (var i = 0; i < 200; i++) {
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
