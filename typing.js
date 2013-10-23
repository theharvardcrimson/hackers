var $cursor = $('<span />').html('&#9608;').addClass('blink cursor');

$(function() {
    typeString($('#logo'), 'THE HARVARD CRIMSON', 0, 100, $cursor, type_headline);
});

function empty($cursor) {}

function type_byline($cursor) {
    $('.cursor').remove();
    $('#byline').prepend($cursor.clone().css('color', 'black').removeClass('blink'));
    console.log('prepended cursor copy to byline');
    setTimeout(function() {
        typeString($('#byline'), 'BY SAM WIENSTOCK AND DEV PATEL', 0, 100, 
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
