$(function () {
    $('.tabs .tab').on('click', function () {
        $('.tabs .tab.active').removeClass('active');
        $(this).addClass('active');
        // var $panel = $(this).closest('.tab-panels');

        // $panel.find('.tabs li.active').removeClass('active');
        // $(this).addClass('active');

        //figure out which panel to show
        var panelToShow = $(this).attr('rel');
        // alert(panelToShow);
        //hide current panel
        $('.panel.active').hide(0, function () {
            $(this).removeClass('active');
            $('#' + panelToShow).show(0, function () {
                $(this).addClass('active');
                // alert();
            });
        });
        //show next panel
    });

    $('.panel').accordion({
        collapsible: true
    });

    // $('#create-rem').on('click', function () {
    //     alert();
    //     const { BrowserWindow } = require('electron')
    //     const win = new BrowserWindow({ width: 800, height: 600 })
    //     win.loadURL(`file://${__dirname}/index.html`);
    // });
});