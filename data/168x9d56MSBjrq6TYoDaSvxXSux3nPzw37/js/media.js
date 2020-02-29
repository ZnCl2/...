var media_frame;

jQuery('.media-control a').live('click', function (event) {

    var self = this;

    event.preventDefault();

    if (media_frame) {
        media_frame.open();
        return;
    }

    media_frame = wp.media.frames.media_frame = wp.media({
        title: jQuery(self).parent().data('title'),
        button: {
            text: jQuery(self).parent().data('update-text'),
        },
        multiple: false
    });

    media_frame.on('select', function () {
        attachment = media_frame.state().get('selection').first().toJSON();

        jQuery(self).parent().find('.image-url').val(attachment.url); // set .image-url value
        jQuery(self).parent().find('.image-preview').attr('src', attachment.url); // update .image-preview
        //      ^^ this is not the element from the click handler but the media frame
    });

    media_frame.open();
});
