(function () {
    'use strict';	
   var garbage_collector = {
      name: 'Сборщик хлама',
      version: '1.0',
      description: 'Убирает не нужные разделы как торренты и лента'
    };
		Lampa.Listener.follow('app',(e)=>{
        if(e.type == 'ready'){
			setTimeout(function(){
				$("[data-action=mytorrents]").eq(0).remove();
				$("[data-action=feed]").eq(0).remove();
			},10); 
        }
    });

})();
