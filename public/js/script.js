// this makes the images on the front page shuffle
$(function() {

    $('.frontPageImage img:gt(0)').hide(); // to hide all but the first image when page loads

    setInterval(function()
    {
        $('.frontPageImage :first-child').fadeOut(1000)
            .next().fadeIn(1000).end().appendTo('.frontPageImage');
    },2000);
});