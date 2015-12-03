// Full-screen scrolling architecture
$(document).ready(function() {
	$('#pagepiling').pagepiling({
		menu: '#menu',
		// Full nav menu buttons
		anchors: ['welcome',
							'about',
							'flaregun',
							'wiki',
							'byg_a',
						  'blackjack',
							// 'other',
							'contact'],
		// navigation tooltip names
    navigation: {
    	'position': 'right',
   		'tooltips': ['Welcome',
									 'About Me',
									 'FlareGun',
									 'Fünke Wiki',
									 'BYG Advantage',
									 'Blackjack',
									//  'Other Projects',
									 'Contact']
   	},
		// apply custom CSS to tooltips after page load
    afterRender: function(){
    	$('#pp-nav').addClass('custom');
    },
    afterLoad: function(anchorLink, index){
    	if(index>1){
    		$('#pp-nav').removeClass('custom');
    	}else{
    		$('#pp-nav').addClass('custom');
    	}
    }
	});
});
