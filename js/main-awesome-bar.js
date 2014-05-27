jQuery(document).ready( function($) {

    if ( document.URL.indexOf('pagecalpop') != -1 ) {
        return;
    }

    $('body').hkrAwesomeBar({
            grayscale: true,
            templateURL: '//www.harker.org/uploaded/plugins/awesome-bar/awesome-bar.tpl.html'
        });

    function setupJoyRide() {
        $("#tour").joyride({ 
            autoStart: true, 
            modal: true,    
            tipContainer: '#bodydiv',
            cookieMonster: true
        });
    }

});