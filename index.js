$(document).ready(function (){
    
    //functions
    function unselectTabs() {
        $('.tab').each(function() {
            $(this).attr('aria-selected', 'false');
        });
    }

    function showPanel() {
        $('.tab').each(function() {
        let idToControl = $(this).attr('aria-controls');
        if($(this).attr('aria-selected') == "true") {
            $('#' + idToControl).show(200);
        }
        else {
            $('#' + idToControl).hide(200);
        }
        });
    }

    function selectTab(tab) {
        $(tab).attr('aria-selected', 'true');
    }


    //processing navigation buttons
    $('.nav-item, .item').not('#login').each(function() {
        $(this).click(function() {
            let idToScroll = $(this).attr('reference');
            $([document.documentElement, document.body]).animate({
                scrollTop: $(idToScroll).offset().top
            }, 500);
            $('#main-nav').removeClass('seen');
        })
    });

    //dealing with tabs and panels
    showPanel();

    $('.tab').each(function() {
        $(this).click(function() {
            unselectTabs();
            selectTab(this);
            showPanel();
        });
    });

    


    //managing navigation module for mobile version
    let navButton = $('#nav-hamburger');
    let closeButton = $('#close');

    navButton.click(function() {
        $('#main-nav').toggleClass('seen');
    });
    closeButton.click(function() {
        $('#main-nav').toggleClass('seen');
    });


    //swiching arrows in the question section
    $('.question').each(function() {
        // console.log(this);
        $(this).click(function() {
            let answerId = $(this).attr('aria-controls');
            $('#' + answerId).slideToggle();

            if($(this).hasClass('clicked')){
                $(this).removeClass('clicked');
                $(this).children().eq(1).attr('src', './images/icon-arrow.svg');
            }
            else {
                $(this).addClass('clicked');
                $(this).children().eq(1).attr('src', './images/icon-arrow-2.svg');
            }
        });
    });

    //email validation
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
    $('#contact-btn').click(function() {
        let email = document.getElementById('email').value;
        let result = validateEmail(email);
        if(result){
            //request to a server to process the email goes here
        }
        else {
            if(!$('#email').hasClass('error-occured')){
                $('#error').show();
                $('#error-message').slideDown();
                $('#email').addClass('error-occured');

                setTimeout(() => {
                    $('#error').hide();
                    $('#error-message').slideToggle();
                    $('#email').removeClass('error-occured');
                }, 3000);
            }
        }
    });

});

//default behavior prevention when submitting the form
function emailRequest(e) {
    e.preventDefault();
}


