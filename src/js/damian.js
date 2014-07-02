(function($) {
  var config = {};
  
  function getRandomIcon() {
	 return config.icons[Math.floor((Math.random()*config.icons.length)+1) - 1]; 
  }
  function getRandomSep() {
	return config.seps[Math.floor((Math.random()*config.seps.length)+1) - 1];
  }
  
  function escapeHTML(text) {
    return text.replace(/[\"&<>]/g, function (a) { return ESCAPE[a]; });
  }
  
  function useWd() {
	config.wd = !(BrowserDetect.browser == 'Opera' || (BrowserDetect.browser == 'Firefox' && BrowserDetect.OS != 'Linux'));
	// debug
	// config.wd = false;
	// console.log("Does it use Wingdings? " + config.wd + " [" + BrowserDetect.browser + ", " + BrowserDetect.OS + "]");
  }
  
  function initData(wd) {
	config.menu_trans = config.wd ? 
	  {"trans" : [
		{"id": "menu-item-8", "normal" : "K", "hover" : "J"},
		{"id": "menu-item-9", "normal" : ",", "hover" : "."},
		{"id": "menu-item-10", "normal" : "M", "hover" : "N"},
		{"id": "menu-item-11", "normal" : "&", "hover" : "C"},
		{"id": "menu-item-12", "normal" : "$", "hover" : "°"}]}
	  :
	  {"trans" : [
		{"id": "menu-item-8", "normal" : "😐", "hover" : "☺"},
		{"id": "menu-item-9", "normal" : "✍", "hover" : "✉"},
		{"id": "menu-item-10", "normal" : "💣", "hover" : "☠"},
		{"id": "menu-item-11", "normal" : "☍", "hover" : "✌"},
		{"id": "menu-item-12", "normal" : "⚓", "hover" : "☒"},
	  ]};
	  
	config.icons = config.wd ? "1234567890asdfghjklñzxcvbnmqwertyuiopASDFGHJKLÑZXCVBNMQWERTYUOP'¡!\"·$%&/()=?¿`+́ç^*̈Ç,.-;:_{" : //<";
	  "⌛⌨♋♌♍♎♏♐♑♒♓&●❍■□❑❒⬧⧫◆❖⬥⌧⍓⌘✌☜☞☝☟✋☺😐☹💣☠⚐✈☼❄✞✠✡☪□✏✂✁☎✆✉✇✍♈♉♊❀✿❝❞○🕐";
	
	config.seps = config.wd ? ["h", "d", "S", "o", "L", "+", "´", "1", "$", "`", "x", "z", "T", "M", "N", "HG", "JKL", "-,", "po", "MN", "YUZ", "+.", /*"<=", "<:", */"7:8", "\"2"] :
	  ["♒", "♎", "□", "☹", "●", "♊", "⌧", "⌘", "❄", "💣", "☠", "☟☝", "☺😐☹", "□■", "💣☠", "✡✞☪"];
  }
  
  // Main function
  $(document).ready(function() {
	// init
	BrowserDetect.init();
	useWd();
	initData();
	
	
	// Adds H2 link
	var h2 = $('h2.site-description');
	var h2text = h2.html();
	h2.html(h2text.replace('Damian Flores', '<a href="http://damianflores.es" title="Web">Damian Flores</a>'));
	
	// Changes menu
	$.each(config.menu_trans.trans, function(index, elem) {
	  var jelem = $('li#' + elem.id + '> a');
	  jelem.html(elem.normal);
	  jelem.mouseenter(function(e) {
		jelem.html(elem.hover);
	  });
	  jelem.mouseleave(function(e) {
		jelem.html(elem.normal);
	  });
	});
	
	// Adds images to the posts
	$('.wd-image').each(function(index, elem) {
	  var type = Math.random() > 0.5;
	  var icon = getRandomIcon();
	  
	  if(type) {
		$(elem).html(icon);
		$(elem).addClass("wd-image-1");
	  } else {
		$(elem).html(icon + icon + icon + "<br/>"+ icon + icon + icon + "<br/>"+ icon + icon + icon + "<br/>");
		$(elem).addClass("wd-image-3");
	  }
	});
	
	// Adds separators
	$('.wd-sep').each(function(index, elem) {
	  var icon = getRandomSep();
	  for (var i = 0; i < 7; i++) {
		icon += icon;
	  }
	  $(elem).text(icon);
	});
	
	// No wingdings support
	if(!config.wd) {
	  $('#wd-warning').show();
	}
  });
})(jQuery);
