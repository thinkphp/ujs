# u JS - Super lightweight javascript library

A super lightweight JS library for when you need to do something simple (3.55K after minification [http://yui.2clics.net/]).

## .ready( fn ) DOM Ready

Registers a function (callback) to run when the DOM is ready.

```js
$.ready(function() {

        alert("DOM is ready")
})
```

## $( selector ) Selectors

Uses `querySelectorAll` to return a list of the elements withing the document (using depth-first pre-order traversal of the document's nodes) that
match the specified group of selectors. The object returned is an non-live [NodeList] of element objects( invoked Array.prototype.slice to make arguments a real array ).
note: querySelectorAll was introduced in the WebApps API.
note: read Live vs Static Node Lists http://darcyclarke.me/development/live-vs-static-node-lists/

$( selector ) - is a string containing one or more CSS selectors separated by commas.

```js

console.log( $( "div p" ) ) 

```

## .each( fn ) each

Sets a function to fire for each element in the result set with "this" inside.

```js
$.ready(function() {

      $("p").each(function(){

             $(this).css("color: #000; background: lightblue; font-size: 20px;padding: 10px") 
      }) 
})
```

## .bind( ev, fn ) Event Handling

Attach a handler (a function to execute each time the event is triggered ) to an event (a string containing one DOM event such as `click` or `mouseover`) 
for the elements in the result set. Note: `this` object inside the callback.


```js
   $("h2").bind('click', function( e ){

       alert(this.innerHTML)
   })
```

## .delegate( selector, ev, fn ) Event Delegation

Attach a handler to one event for all elements that match the selector based on result set elements.

```js

    $("#menu").delegate("li a", 'click', function(e) {

          var ul = this.parentNode.querySelectorAll('ul')[0]

          if(ul.style.display == '' || ul.style.display == 'block') {

             $(ul).css("display: none") 

          } else if(ul.style.display == 'none') {

             $(ul).css("display: block") 
          }
    })

```

## .css( properties )

Set one or more CSS properties for every matched element.

```js
    $("p").bind('mouseover', function(){
          $(this).css("color: orange;font-size: 20px")
    })

    $("p").bind('mouseout', function(){
          $(this).css("color: #000;font-size: 14px")
    })
```

## .html( HTMLContent )

Set the HTML contents of every matched element.

```js
   $("p").bind("click", function() {

      $(this).html("u JS .html() - set the HTML contents of every matched element"); 
   }) 
```     

## .load( url )

Loads data from a server and puts the returned data into the selected element.

```js

   //load the content of the file 'pre.html' into a specific '<pre><code>' element.
   $("pre code").load("pre.html")

```

## $.each( arr, fn ) - static method

Executes a provided function once per array element.

```js

   $.each(arr, function(elem, index){

          console.log(elem + ' - ' + index)
   })

```


## $.ajax( method, url, callback ) - static method

Perform an asynchronous HTTP (Ajax) request.

```js

   $.ajax("GET", "h1.html", function( data ){

        $("h1").html( data )
   })
 
```
# Examples:

[http://thinkphp.ro/apps/js-hacks/ujs/examples/]
[http://thinkphp.ro/apps/js-hacks/ujs/examples/]: http://thinkphp.ro/apps/js-hacks/ujs/examples/
[http://yui.2clics.net/]: http://yui.2clics.net/
[NodeList]: https://developer.mozilla.org/en-US/docs/DOM/NodeList