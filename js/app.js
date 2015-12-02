$(document).ready(function() {
	$('#pagepiling').pagepiling({
		menu: '#menu',
		anchors: ['welcome', 'about', 'final_project', 'wiki', 'byg_a',
						 'black_swan', 'blackjack', 'contact'],
    sectionsColor: ['white', '#ee005a', '#2C3E50', '#39C'],
    navigation: {
    	'position': 'right',
   		'tooltips': ['Welcome', 'About Me', 'GA Final Project', 'Fünke Wiki',
									'BYG Advantage', 'Black Swan', 'Blackjack', 'Contact']
   	},
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
