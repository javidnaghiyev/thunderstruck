//search focus thing
$(document).ready(function () {
    $(document).on('contextmenu', function () {
        return false;
    })
    $('#search').focusin(function () {
        $('#search-wrapper').css("background", "black");
    });
    $('#search').focusin(function () {
        $('#search-wrapper').css("border", "1px solid #17BF63");
    });

    $('#search').focusout(function () {
        $('#search-wrapper').css("background", "");
    });
    $('#search').focusout(function () {
        $('#search-wrapper').css("border", "");
    });
    
    $('#tweet-left').on('click', function () {
        $('#status-input').addClass('active');
    })

//search-suggestion
    var submenu = $('.search-suggestion')
    $("#search").click(function (event) {
        event.stopPropagation()
        submenu.addClass('active')
        if (more.has('active')) {   //removes more dropdown menu from more if it has it open when clicking search
            more.removeClass('active');
        }
    })

    $(document).on('click', function (event) {
        if (!$(event.target).closest(submenu,'#search').length) {
            submenu.removeClass('active');
        }
    })

//more submenu
    var more = $('#more-more')
    $('[data-trigger="more-left-button-wrapper"]').click(function (event) {
        event.stopPropagation()
        more.addClass('active')
        if (submenu.has('active')){  //removes search suggestion from more if it has it open when clicking more
            submenu.removeClass('active');
        }
    })

    $(document).on('click', function (event) {
        if (!$(event.target).closest(more, '[data-trigger="more-left-button-wrapper"]').length) {
            more.removeClass('active');
        }
    })


    $('#tweet-in-status').on('click', function (event) {
        var statusLength = $('#status-input').val();
        var firstPost = $('#first-post');
        if (statusLength.length == 0){
            event.preventDefault();
            console.log("default prevented")
        }else{
            firstPost.append(statusLength)
        }
    })

    // CUSTOM CONTEXT MENU
    $(document).on('mousedown', function (event) {
        var x = event.pageX;
        var y = event.pageY;
        var rightEndContext = x + $('.context-menu-wrapper').width();
        var bottomEndContext = y + $('.context-menu-wrapper').height();
        var hiddenContexts = $('.context-menu li:not(.forward-morward)');
        if (event.which == 3){
            if ($(event.target).is('input')){
                $(hiddenContexts).removeClass('active')
                $('.text-hidden').addClass('active');
            }else if ($(event.target).is('img')){
                $(hiddenContexts).removeClass('active')
                $('.image-hidden').addClass('active')
            }else if($(event.target).is('div')){
                if ($(this).has('a')){
                    $(hiddenContexts).removeClass('active')
                    $('.link-hidden').addClass('active')
                }
            }else{
                $(hiddenContexts).removeClass('active')
            }

            if(rightEndContext > $(window).width() && bottomEndContext < $(window).height()){
                $('.context-menu-wrapper').css({'top': y, 'left': $(window).width() - $('.context-menu-wrapper').width()});
                $('.context-menu-wrapper').fadeIn(100);
                return false;
            }else if(rightEndContext > $(window).width() && bottomEndContext > $(window).height()){
                $('.context-menu-wrapper').css({'top': y - $('.context-menu-wrapper').height(), 'left': $(window).width() - $('.context-menu-wrapper').width()});
                $('.context-menu-wrapper').fadeIn(100);
                return false;
            }else if(rightEndContext < $(window).width() && bottomEndContext > $(window).height()){
                $('.context-menu-wrapper').css({'top': y - $('.context-menu-wrapper').height(), 'left': x});
                $('.context-menu-wrapper').fadeIn(100);
                return false;
            }else{
                $('.context-menu-wrapper').css({'top': y, 'left':x});
                $('.context-menu-wrapper').fadeIn(100);
                return false;
            }
        }
        $('.context-menu-wrapper').fadeOut(100)

    })

    //Comment shit
    $('.comment-writer textarea, .comment-writer button').focusin(function () {
        $('.comment-writer button').addClass('active')
    })
    $(document).on('click', function (event) {
        if (!$(event.target).closest('.comment-writer').length){
            $('.comment-writer button').removeClass('active')
        }
    })
    $('.comment-writer button').on('click', function () {
        var commentValue = $('.comment-writer textarea').val()
        $('#first-post').append('<br />', commentValue)
    })
    var reloadPage = $('#reload-page');
    reloadPage.on('click', function () {
        location.reload()
    })
    reloadPage.location = $(this).data("#")

    //MINI BIO
    var close;
    function openMiniBio(){
        $('#mini-bio').fadeIn(200)
    }
    function closeMiniBio(){
        $('#mini-bio').fadeOut(200)
    }
        $('.profile-photo img, .name').on('mouseover', function(event) {
            var ppLocationTop = $(this).offset().top - $(window).scrollTop();
            var ppLocationLeft = $(this).offset().left;
            var scrollBottom = $(window).height() + $(window).scrollTop()
            var miniBioBottom = ppLocationTop + 55 + $('#mini-bio').height()
            if (miniBioBottom > scrollBottom) {
                $('#mini-bio').css({
                    top: ppLocationTop - 285,
                    left: ppLocationLeft - 120
                })
            }else{
                $('#mini-bio').css({
                    top: ppLocationTop + 55,
                    left: ppLocationLeft - 120
                })
            }
            setTimeout(openMiniBio, 500)
        })
        $('#mini-bio').on('mouseenter', function () {
            clearTimeout(close)
        })
        $('#mini-bio').on('mouseleave', function () {
            close = setTimeout(closeMiniBio, 300)
        })
        $('.profile-photo img, .name').on('mouseleave', function () {
            close = setTimeout(closeMiniBio, 400)
        })
})