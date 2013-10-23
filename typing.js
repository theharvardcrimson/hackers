$(function() {
    var $cursor = $('<span />').html('&#9608;').addClass('blink');
    typeString($('#logo'), 'THE HARVARD CRIMSON', 0, 100, $cursor, function() {
        setTimeout( function() {
            typeString($('#headline'), 'HACKING HARVARD', 0, 100, $cursor, 
                function() {});
        }, 500);
    });
});

function typeString($target, str, pos, delay, $cursor, cb) {
    $target.html(str.substring(0, pos + 1)).append($cursor);
    if (pos < str.length - 1) {
        setTimeout(function () {
            typeString($target, str, pos + 1, delay, $cursor, cb);
        }, delay);
    }
    else {
        $target.append($cursor);
        cb();
    }
}
