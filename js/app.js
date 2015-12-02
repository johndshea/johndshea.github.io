$(document).ready(function() {
	$('#pagepiling').pagepiling({
		menu: '#menu',
		// Full nav menu buttons
		anchors: ['welcome',
							'about',
							'flaregun',
							'wiki',
							'byg_a',
						  'black_swan',
							'blackjack',
							'contact'],
		// background colors for each section, in order
    sectionsColor: ['white',
										'white',
										'white',
										'white',
										'white',
										'white',
										'white',
										'white'],
		// navigation tooltip names
    navigation: {
    	'position': 'right',
   		'tooltips': ['Welcome',
									 'About Me',
									 'FlareGun',
									 'Fünke Wiki',
									 'BYG Advantage',
									 'Black Swan',
									 'Blackjack',
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
