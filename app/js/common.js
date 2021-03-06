$(function() {

	var date = new Date();
	var month = date.getMonth() + 1;
	var day = date.getDate()
	var newdate = (day < 10 ? '0' : '') + day + '.'
	+ (month < 10 ? '0' : '') + month + '.'
	+ date.getFullYear();
	$('.newdate').append(newdate)
	

	$(".slider").owlCarousel({
		nav: true,
		dots: false,
		loop: false,
		navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		responsive : {
			0 : {
				items : 1	
			},
			1200 : {
				items : 2
			}
		}
	});

	$('.form_check').each(function(){

		var form = $(this),
		btn = form.find('.submit_b');

		form.find('.rfield').addClass('empty_field').parents('.input-wrap').append('<span class="rfield_error">Заполните это поле</span>');
		btn.addClass('disabled');
			// проверка полей формы      
			function checkInput(){
				
				form.find('.rfield').each(function(){
					
					if($(this).hasClass('mailfield')) {
						var mailfield = $(this);
						var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
						if(pattern.test(mailfield.val())){
							mailfield.removeClass('empty_field');
						} else {
							mailfield.addClass('empty_field');
						}
					} else if($.trim($(this).val()) != '') {
						$(this).removeClass('empty_field');
					} else {
						$(this).addClass('empty_field');
					}

				});
			}
			
			// подсветка незаполненных полей
			function lightEmpty(){
				form.find('.empty_field').addClass('rf_error');
				form.find('.empty_field').parents('.input-wrap').find('.rfield_error').css({'visibility':'visible'});
				setTimeout(function(){
					form.find('.empty_field').removeClass('rf_error');
					form.find('.empty_field').parents('.input-wrap').find('.rfield_error').css({'visibility':'hidden'});
				},1500);
			}
			
			//  проверка полей
			function checkform(){
				checkInput();
				var sizeEmpty = form.find('.empty_field').length;
				if(sizeEmpty > 0){
					if(btn.hasClass('disabled')){
						return false
					} else {
						btn.addClass('disabled')
					}
				} else {
					btn.removeClass('disabled')
					$('.popup-wrap').removeClass('hidden')
				}
			}
			
			//  Клик по кнопке
			btn.click(function(e){
				checkform()
				if($(this).hasClass('disabled')){
					lightEmpty();
					return false
				} else {
					setTimeout(function(){
						$('.form_check').submit();
						$(".form_check").trigger("reset");
					},2000);
					
				}
				e.preventDefault();	
			});

			;

			$('.popup__close').on('click', function(){
				$('.popup-wrap').toggleClass('hidden')
			})
			$('.popup-wrap').on('click', function(e){
				if (e.target.className === 'popup-wrap'){
					$('.popup-wrap').toggleClass('hidden')
				}
			})
			
		});








});
