 ;(function() {
	'use strict';
 	
  var $add = $('#add'),
  $here = $('#here'),
  $list = $('#list'),
  DATAS = [
    { id: 1, desc: 'Run', done: false},
    { id: 2, desc: 'Read a book', done: false},
    { id: 3, desc: 'Pray', done: true},
 	{ id: 4, desc: 'Wash a car', done: false},
  ];

  var ENTER_KEY = 13;
    
  function app() {
	addEventListeners();
	render();
  }
  
  function addEventListeners() {

  	console.log('addEventListeners');

  	$.on( $add ,'keyup', function( e ){
  		
  		var value = e.target.value;
  		//console.log( $add.value );
  		//$here.innerHTML = $add.value ;
		//alert( value.length );
  		if( e.keyCode === ENTER_KEY && value.length > 0 ) {
  			
  			$add.value = '';
  			var nid = ((DATAS.length)+1);	
  			DATAS.push( { id: nid, desc: value, done: false } );
  			render();
  		}

  	});

  	
    $.delegate($list, 'li', 'click', doneLi );

  	$.on( $add ,'click', clicou );
  	
  }

  var clicou = function() {
 	console.log('clicou');
  }

  function doneLi( a ){
  	
    var el = a.target;
		DATAS.forEach(function(obj){
			if(obj.id == (el.dataset.id)){
			    //console.log('obj id e: ',obj.id);
				(obj.done) ? obj.done = false : obj.done = true;
				render();
			}
		});
  }

  function render(){
  	var fragLi = document.createDocumentFragment(); //Create a new fragment for li   
    var fragBtn = document.createDocumentFragment(); //Create a new fragment for Button

  	DATAS.forEach( function( obj, i ){
  	  var li = document.createElement( 'li' ); 
  	  li.dataset.id = obj.id;
  	  var btn = document.createElement( 'button' );

      btn.appendChild(document.createTextNode("X"));
  	  li.appendChild( document.createTextNode(  obj.id + " - " + obj.desc + "  "));
      
      if(obj.done) li.setAttribute("class", "done");
    
      fragBtn.appendChild(btn);
      li.appendChild(fragBtn);
      fragLi.appendChild( li );
  	});

  	$list.innerHTML = '';
  	$list.appendChild( fragLi );
  }
 
  // Initialization on Dom Ready
  window.addEventListener('DOMContentLoaded', app);

})();
