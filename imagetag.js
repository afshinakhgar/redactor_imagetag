(function($)
{
	$.Redactor.prototype.imagetag = function()
	{
		return {
			// reUrlYoutube: /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com\S*[^\w\-\s])([\w\-]{11})(?=[^\w\-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig,
			// reUrlVimeo: /https?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/,
			// reUrlAparat: /https?:\/\/(www\.)?sabavision.com\/v\/([0-9a-zA-Z-]+)/,
			langs: {
				en: {
					"imagetag": "Image",
					"image-html-code": "Add image Address"
				},
                fa: {
                    "imagetag": "تصویر",
                    "image-html-code": "آدرس تصویر را وارد کنید"
                }
			},
			getTemplate: function()
			{
				return String()
				+ '<div class="modal-section" id="redactor-modal-imagetag-insert">'
					+ '<section>'
						+ '<label>' + this.lang.get('image-html-code') + '</label>'
						+ '<textarea id="redactor-insert-imagetag-area" style="height: 160px;"></textarea>'
					+ '</section>'
					+ '<section>'
						+ '<button id="redactor-modal-button-action">Insert</button>'
						+ '<button id="redactor-modal-button-cancel">Cancel</button>'
					+ '</section>'
				+ '</div>';
			},
			init: function()
			{
				var button = this.button.add( 'imagetag', this.lang.get('imagetag'));

                // var button = this.button.add('imagetag', 'imagetag');
                this.button.setIcon(button, '<i class="fa fa-camera" aria-hidden="true"></i>');


                this.button.addCallback(button, this.imagetag.show);
			},
			show: function()
			{
				this.modal.addTemplate('imagetag', this.imagetag.getTemplate());

				this.modal.load('imagetag', this.lang.get('imagetag'), 700);

				// action button
				this.modal.getActionButton().text(this.lang.get('insert')).on('click', this.imagetag.insert);
				this.modal.show();

				// focus
				if (this.detect.isDesktop())
				{
					setTimeout(function()
					{
						$('#redactor-insert-imagetag-area').focus();

					}, 1);
				}


			},
			insert: function()
			{
				var data = $('#redactor-insert-imagetag-area').val();


                var imgStart = '<div class="' + this.opts.imageContainerClass + '"><img style="width: 500px; height: 281px;" src="',
                    imgEnd = '"  /></div>';

                // data = this.clean.stripTags(data);
                data = imgStart + data + imgEnd;

				this.modal.close();
				this.placeholder.hide();

				// buffer
				this.buffer.set();

				// insert
				this.air.collapsed();
				this.insert.html(data);

			}

		};
	};
})(jQuery);