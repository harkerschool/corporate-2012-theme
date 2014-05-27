(function($) {
    $(document).ready( function() {
        var $container = $('#mainmiddle');

        // track HNO stories
        $('.hno-feed').on('click', '.wp-article a', function() {
            trackOutboundEvent(this, 'HNO Feeds', 'Read more', $(this).text() );
            return false;
        });

        // track jQuery UI tabs in content area (i.e. portal tabs) 
        $('#portal_tabs').on('tabsload', function( event, ui ) {
            trackEvent( 'Portal Tabs', 'Tab Load', $(ui.tab).text() );
        });

        // track sidebar tabs
        $('#rightbanner').on('hkrTabs.tabsactivate', '.hkr-tabs li', function() {
            trackEvent( 'Sidebar Tabs', 'Tab Activate', $(this).text() );
        });

        // track inquiries
        $container.on('click', 'a[href="https://webappsca.pcrsoft.com/ApplicationOnlineV2/InquiryMain.aspx?scn=SGFya2Vy&appId=2"]', function(e) {
            e.preventDefault();
            trackOutboundLink( this, 'Outbound Links', 'Click', '/Admission/Prescool & K-5 Inquiry');
        });
        $container.on('click', 'a[href="https://webappsca.pcrsoft.com/ApplicationOnlineV2/InquiryMain.aspx?scn=SGFya2Vy&appId=1"]', function(e) {
            e.preventDefault();
            trackOutboundLink( this, 'Outbound Links', 'Click', '/Admission/Grades 6-12 Inquiry');
        });

        // track open house 
        $container.on('click', 'a[href="https://webappsca.pcrsoft.com/EventScheduling/Default.aspx?scn=SGFya2Vy&appId=1%20"]', function(e) {
            e.preventDefault();
            if ( $(this).hasClass('shadowvisit') ) {
                trackOutboundLink( this, 'Outbound Links', 'Click', '/Admission/Shadow Visits/Registration');
            } else {
                trackOutboundLink( this, 'Outbound Links', 'Click', '/Admission/Open House Events/Registration');
            }
        });

        // admission is tracked in html

        // track online giving form
        $container.on('click', 'a[href="https://harker.thankyou4caring.org/sslpage.aspx?pid=379%20"]', function(e) {
            e.preventDefault();
            trackOutboundLink( this, 'Outbound Links', 'Click', '/Support Harker/Online Giving Form');
        });

        admissionModals();
    });

    function admissionModals() {
        var $modals = $( ".hkr-modal-content");
        $modals.each( function() {
            var $modal = $(this),
                id = $modal.attr('id'),
                title = 'Action Required';

            switch(id) {
            case 'modal-status':
                title = '<i class="fa fa-check-square-o"></i> Check Your Admission Status';
                break;
            case 'modal-inquiry':
                title = '<i class="fa fa-question-circle"></i> Submit an Inquiry';
                break;
            case 'modal-visit':
                title = '<i class="fa fa-eye"></i> Schedule a Visit';
                break;
            case 'modal-apply':
                title = '<i class="fa fa-pencil-square-o"></i> Apply to Harker';
                break;
            }

            $modal.dialog({
                modal: true,
                dialogClass: 'hkr-modal',
                width: 500,
                autoOpen: false,
                title: title
            });
        });

        $(document).on('click', '.admission-ctas a', function() {
            var $modal = $( $(this).attr('href') );
            if ( $modal.length ) {
                $modal.dialog('open');
                return false;
            }
        });
    }
})(jQuery);

function trackEvent(category, action, label) {
    try { 
        _gaq.push(['_trackEvent', category , action, label]); 
    } catch(err){}
}

function trackOutboundLink(link, category, action, label) { 
    label = label || action; // label is optional

    try { 
        _gaq.push(['_trackPageview', label]); 
    } catch(err){}

    try { 
        _gaq.push(['_trackEvent', category , action, label]); 
    } catch(err){}
     
    setTimeout(function() {
        document.location.href = link.href;
    }, 200);
}

function trackOutboundEvent(link, category, action, label) {
    label = label || link.href; // label is optional

    try { 
        _gaq.push(['_trackEvent', category , action, label]); 
    } catch(err){}
     
    setTimeout(function() {
        document.location.href = link.href;
    }, 100);
}