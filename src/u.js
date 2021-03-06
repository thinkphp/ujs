(function(context){

  var doc = document,

      addEventListener = 'addEventListener',

      attachEvent = 'attachEvent',

      DOMContentLoaded = 'DOMContentLoaded',

      readyState = 'readyState',

      querySelectorAll = 'querySelectorAll',

      w3c = !!doc[ addEventListener ],

      ie =  !!doc[ attachEvent ],

      complete = /complete/.test(doc[ readyState ]),

      loading = /loading/.test(doc[ readyState ]),

      addEvent = function(elem, ev, fn, capture) {

               if( w3c ) {

                   elem[ addEventListener ]( ev, fn, capture )

               } else if( ie ){

                   elem[ attachEvent ]('on'+ ev, function( e ) {

                         fn.call( window.event.srcElement , window.event) 
                   })

               } else {

                   elem['on' + ev] = fn
               }

           return fn
      },

      getTarget = function( e ) {

               var target = window.event ? window.event.srcElement : e ? e.target : null

               while(target.nodeType != 1 && target.toLowerCase().nodeName != 'body') {

                       target = target.parentNode;
               }

               if(!target) return false 

               return target;

      },  

      u = function( selector ) {

          var elements = [];

          if(typeof selector == 'string') {

                if( doc[ querySelectorAll ] ) {

                      try{  

                         elements = Array.prototype.slice.call( doc[ querySelectorAll ]( selector ) )

                      } catch(e) {

                         Array.fromSequence = function( seq ) {

                               var arr = new Array(seq.length)

                               for(var i=seq.length; i-->0;) {

                                       if(i in seq) {

                                          arr[i] = seq[i]
                                       }
                               }

                            return arr;
                         };

                         elements = Array.fromSequence( doc[ querySelectorAll ]( selector ) )
                      }

                      //for debugger
                      if(window.console) console.log(elements)
                } 

          } else if(selector.nodeType){

                elements = [ selector ]

          } else if(selector.length) {

                elements = selector
          };


          elements.each = function( fn ) {

                for(var i = 0; i < elements.length; i++) {

                    fn.call( elements[i], i ) 
                }

             return elements
          } 

          elements.bind = function( ev, fn ) {

             return elements.each(function(){

                    addEvent(this, ev, fn, false)
             })

             return elements         
          }

          elements.delegate = function(selector, ev, fn ) {

               var match = function( elem, selector ) {

                   var nodes = elem.parentNode[querySelectorAll]( selector )

                   for(var i = 0; i < nodes.length; i++) {

                       if( nodes[ i ] == elem ) return true 
                   } 

                   return false; 
               } 

               elements.each( function( elem ){

                    addEvent(this, ev, function(e){

                       var target = getTarget( e );

                       if( match( target, selector ) ) {

                          fn.call(target, e) 
                       }
                    }) 
               })

               return elements
          }

          elements.html = function( html ) {

                        var method = "innerHTML"

                        elements.each(function(){

                             this[ method ] = html
                        })
          } 

          elements.css = function( css ) {

                        elements.each(function(){

                             this.style.cssText = css
                        })
          }

          elements.val = function() {

                        elements.each(function(){

                            if(this.nodeType == 1 && this.nodeName.toLowerCase() == 'input') 

                               return this.value
                        })                
          }

          elements.attr = function(p, v) {

                        elements.each(function(){

                               this.setAttribute(p, v)
                        })
                
          }

          elements.load = function( url ) {

                 elements.each( function(){

                     var elem = this 

                     u.ajax("GET", url, function( data ){

                         elem.innerHTML = data                          
                     })     
                 })
          }

        return elements;
      },

      fns = [],

      doReady = function() {
           
          while( fns.length ) {

                fns.shift()();
          }
      };

      u.each = function(arr, fn) {

             var len = arr.length, 
                 i;

             for(i = 0; i < len; i++) { 

                 fn.call(arr, arr[i], i)
             }
      }; 
       
      u.ready = function( fn ){

          if( loading ) {

             fns.push(fn)  
          }

          if( complete ) {

             fn()
          }
   
          /*@cc_on 
          @if (@_jscript_version > 5.7) fns.push(fn)
          @end
          @*/

          //for ff
          if( w3c ) {

              addEvent(window, DOMContentLoaded, doReady)  
          }
          //for ie
          if( doc.documentElement.doScroll ) {

               (function() {

                try {
                  doc.documentElement.doScroll("left")
                  doReady(); 
                } catch(e) {
                  window.setTimeout(arguments.callee, 0) 
                } 

              })();
          } 

          //for backup
          addEvent(window, "load", doReady)
      };


      u.ajax = function(method, url, callback, postData) {

                  function handleReadyState(o,callback) {
                       o.onreadystatechange = function() {
                           if(o.readyState == 4) {
                                 if(o.status == 200) {
                                      callback(o.responseText);

                                 }
                           }
                       }
                  }

                  var XHR = function() {
                       var http;
                       try {
                             http = new XMLHttpRequest();
                             XHR = function(){return new XMLHttpRequest();}
                           } catch(e) {
                                try {
                                      http = new ActiveXObject("Microsoft.XMLHTTP");
                                      XHR = function(){return new ActiveXObject("Microsoft.XMLHTTP");}
                                    } catch(e) {}
                           }

                      return XHR();
                 };


                 var http = XHR();
                     http.open(method,url,true);
                     if(postData) {
                            //Send the proper header information along with the request
                            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                            http.setRequestHeader("Content-length", postData.length);
                            http.setRequestHeader("Connection", "close");
                     }
                     handleReadyState(http,callback);
                     http.send(postData || null);
      };

      u.jsonp = function(url, callback) {

               var fn = "ujs_jsonp_" + (new Date().getTime()),

               //evaluate the json from callback
               evalJsonp = function( callback ) {

                 return function( data ) {

                   var validjson = false

                   if(typeof data == 'string') {

                   try {

                        validjson = JSON.parse(data)

                   }catch(e) {} 

                   } else if(typeof data == 'object') {

                     validjson = data

                   } else {

                     validjson = JSON.parse(JSON.stringify(data));
                   }
 
                   if( validjson ) {
 
                    callback( validjson )

                  } else {

                    if(window.console) console.log('JSONP call returned invalid JSON or empty JSON')
                  }
                }//end func 
               },

               //get the head element
               head = document.getElementsByTagName("head")[0];

           //define a callback
           window[ fn ] = evalJsonp( callback );

           //replace the =? for callback
           url = url.replace('=?','=' + fn) 

           //create an element script
           var s = document.createElement('script');

               //set type attribute
               s.type = 'text/javascript';

               //set src attribute
               s.src = url;

               //append to the head
               head.appendChild(s);
    };

  context["$"] = u;

})(window);







