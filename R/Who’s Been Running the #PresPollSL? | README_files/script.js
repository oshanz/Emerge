function selectBillingModel()
{
	(function($){

		$(document).ready(function(){

			var radioModel = $('input[name="ad_model"]:checked');
			var radioValues = $(".bsaProInputsValues");
			var radioValuesCPC = $(".bsaProInputsValuesCPC");
			var radioValuesCPM = $(".bsaProInputsValuesCPM");
			var radioValuesCPD = $(".bsaProInputsValuesCPD");

			$('input[name="ad_limit_cpc"]').prop('checked', false);
			$('input[name="ad_limit_cpm"]').prop('checked', false);
			$('input[name="ad_limit_cpd"]').prop('checked', false);

			$('input[name="ad_model"]').click(function() {
				$('.bsaInputInnerModel').removeClass('bsaSelected');
				$(this).parent(2).addClass('bsaSelected');
			});

			radioValues.slideUp();

			if ( radioModel.val() == 'cpc' ) {
				radioValuesCPC.slideDown();
				radioModel.addClass('bsaSelected');
			} else if ( radioModel.val() == 'cpm' ) {
				radioValuesCPM.slideDown();
				radioModel.addClass('bsaSelected');
			} else if ( radioModel.val() == 'cpd' ) {
				radioValuesCPD.slideDown();
				radioModel.addClass('bsaSelected');
			}

		});

	})(jQuery);
}

(function($){

	$(document).ready(function(){

		if ( $('#bsa-Pro-PayPal-Payment').length ) {
			$('.bsaPayPalSection').fadeIn();
			var setRedirect = setInterval(function(){document.getElementById('bsa-Pro-PayPal-Payment').submit()},1000);
			setTimeout(function() { clearInterval(setRedirect); }, 1050);
		}

		var bsaProItem = $('.bsaProItem');
		bsaProItem.each(function() {
			if ( $(this).data('animation') != null && $(this).data('animation') != 'none' ) {
				$(this).addClass('bsaHidden').viewportChecker({
					// Class to add to the elements when they are visible
					classToAdd: 'animated ' + $(this).data('animation'),
					offset: 100,
					repeat: false,
					callbackFunction: function(elem, action){}
				});
			}
		});

	});

})(jQuery);