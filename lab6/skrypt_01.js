//jshint browser: true, esversion:6, jquery:true
$(() => {
    $('tr').click( function () {
        $('tr').removeClass('yellow');
        $(this).addClass('yellow');
    });
    $(this).keydown( function (e) {
        let row = $('.yellow');
        if(e.key === "ArrowUp"){
            row.insertBefore(row.prev());
        }
        if(e.key === "ArrowDown"){
            row.insertAfter(row.next());
        } 
    });
    $('td').dblclick( function () {
        let val = $(this).text();
        $(this).empty();
        $(this).append(
            $('<input>', {
                type: 'text',
                val: val
            })
        );
        $(this).children().first().keyup( function (e) {
            if (e.key === "Enter") {
                val = $(this).val();
                $(this).parent().text(val);
                $(this).remove();     
            }
        });
    });
});
