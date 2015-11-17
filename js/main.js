$(function() {
    "use strict";

    /* ==========================================================================
   Sub Form   
   ========================================================================== */



    $('#mc-form').ajaxChimp({
        language: 'cm',
        url: 'http://csmthemes.us3.list-manage.com/subscribe/post?u=9666c25a337f497687875a388&id=5b881a50fb'
            //http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx
    });


    $.ajaxChimp.translations.cm = {
        'submit': 'Submitting...',
        0: '<i class="fa fa-envelope"></i> Awesome! We have sent you a confirmation email',
        1: '<i class="fa fa-exclamation-triangle"></i> Please enter a value',
        2: '<i class="fa fa-exclamation-triangle"></i> An email address must contain a single @',
        3: '<i class="fa fa-exclamation-triangle"></i> The domain portion of the email address is invalid (the portion after the @: )',
        4: '<i class="fa fa-exclamation-triangle"></i> The username portion of the email address is invalid (the portion before the @: )',
        5: '<i class="fa fa-exclamation-triangle"></i> This email address looks fake or invalid. Please enter a real email address'
    };


    /* ==========================================================================
   Tweet
   ========================================================================== */


    $('.tweet').twittie({
        username: 'envatomarket', // change username here
        dateFormat: '%b. %d, %Y',
        template: '{{tweet}} {{user_name}}',
        count: 10
    }, function() {
        var item = $('.tweet ul');

        item.children('li').first().show().siblings().hide();
        setInterval(function() {
            item.find('li:visible').fadeOut(500, function() {
                $(this).appendTo(item);
                item.children('li').first().fadeIn(500);
            });
        }, 5000);
    });


    /* ==========================================================================
   sticky nav
   ========================================================================== */

    /* ==========================================================================
   litebox
   ========================================================================== */

    $('.litebox-hero, .litebox-tour').magnificPopup({
        type: 'iframe'
    });


    /* ==========================================================================
       Number animation
       ========================================================================== */


    $('.welcome-message').waypoint(function() {

        var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');

        $('.total-number-1').animateNumber({
            number: 50, //change value here
            numberStep: comma_separator_number_step
        }, 6000);

    }, {
        offset: '80%'

    });




    /* ==========================================================================
   Feature image absolute position height fix
   ========================================================================== */

    $(window).load(function() {
        var featureImg = function() {
            $(".features div[class='row'] .col-md-7").each(function() {
                var newHeight = 0,
                    $this = $(this);
                $.each($this.children(), function() {
                    newHeight += $(this).height();
                });
                $this.height(newHeight);
            });
        };


        featureImg();


        $(window).on("resize", function() {
            featureImg();
        });


    });




    /* ==========================================================================
   Smooth scroll
   ========================================================================== */

    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({

                    scrollTop: (target.offset().top - 40)
                }, 1000);
                return false;
            }
        }
    });

    /* ==========================================================================
   Get started popup
   ========================================================================== */
    $('.litebox-getstarted').magnificPopup({
        type: 'inline',
		mainClass: 'mfp-fade',
		removalDelay: 500,
		focus: 'input'
    });
	
	$('input[name=gs_date]').glDatePicker({
		showAlways: false,
		selectableDOW: [1,2,3,4,5],
		zIndex: 1000,
		onClick: function(target, cell, date, data) {
			target.val(date.getFullYear() + '-' + ('0' + date.getMonth()).slice(-2) + '-' + ('0' + date.getDate()).slice(-2));
		},
		onShow: function(calendar){
			calendar.slideDown();
			$(".mfp-wrap").animate({ scrollTop: $('#getstarted-popup').height() }, 500);
		},
		onHide: function(calendar){
			calendar.slideUp();
		}
	});
	
	$('#getstarted-popup .fileinput input').each(function(){
		$(this).siblings('.fileinput_overlay').text($(this).val());
	});
	$('#getstarted-popup .fileinput input').change(function(){
		$(this).siblings('.fileinput_overlay').text($(this).val());
	});
	
	var getstarted_processing = false;
	$('#getstarted-popup form').submit(function(e){
		e.preventDefault();
		if (!getstarted_processing){
			getstarted_processing = true;
			$('#getstarted-popup button.btn').prop('disabled');
			$('#getstarted-popup button.btn').html('<span class="fa fa-spinner fa-spin"></span>');
			$.ajax({url: $(this).attr('action'), type: $(this).attr('method'), data: new FormData(this), processData: false, contentType: false, dataType: 'json'}).always(function(ret){
				getstarted_processing = false;
				$('#getstarted-popup .alert').remove();
				$('#getstarted-popup button.btn').removeProp('disabled');
				$('#getstarted-popup button.btn').text('Send');
			}).success(function(ret){
				if (ret.state == 'Success') $('#getstarted-popup button.btn').before('<div class="alert alert-success">Message was sent</div>');
				else $('#getstarted-popup button.btn').before('<div class="alert alert-failure">' + ret.msg + '</div>');
			}).fail(function(){
				$('#getstarted-popup button.btn').before('<div class="alert alert-failure">There were an error while sending data</div>');
			});
		}
	});
	
	$('#bgvid-playbtn').fadeTo('medium', 0);
	$('#bgvid').click(function(){
		$('#bgvid')[0].pause();
		$('#bgvid-playbtn').fadeTo('medium', 1);
	});
	$('#bgvid-playbtn').click(function(){
		if ($('#bgvid')[0].paused){
			$('#bgvid')[0].play();
			$('#bgvid-playbtn').fadeTo('medium', 0);
		} else {
			$('#bgvid')[0].pause();
			$('#bgvid-playbtn').fadeTo('medium', 1);
		}
	});
});