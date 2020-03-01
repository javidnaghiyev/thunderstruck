$('.profile-photo').on('mouseleave', function (event) {
    if (!$(event.toElement).is($('#mini-bio'))){
        setTimeout(function () {
            $('#mini-bio').removeClass('active')
        }, 500)
    }else{
        $('#mini-bio').on('mouseleave', function () {
            setTimeout(function () {
                $('#mini-bio').removeClass('active')
            }, 500)
        })
    }
})