# u JS - Super lightweight javascript library

A super lightweight JS library for when you need to do something simple.

## .ready() DOM Ready

```js
$.ready(function() {

        alert("DOM is ready")
})
```

## $(selector) Selectors

Uses `querySelectorAll` to return a list of the elements withing the document (using depth-first pre-order traversal of the document's nodes) that
match the specified group of selectors. The object returned is not an array, not a NodeList (use Array.prototype.slice).

```js

$(selector) - is a string containing one or more CSS selectors separated by commas.

alert($("div p")) 

```

## .each() each

```js
$.ready(function() {

      $("p").each(function(){

             $(this).css("color: #000; background: lightblue; font-size: 20px;padding: 10px") 
      }) 
})
```

## .bind() Event Handling

```js
   $("h2").bind('click', function( e ){

       alert(this.innerHTML)
   })
```

## .delegate() Event Delegation

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

## .css()

```js
    $("p").bind('mouseover', function(){
          $(this).css("color: orange;font-size: 20px")
    })

    $("p").bind('mouseout', function(){
          $(this).css("color: #000;font-size: 14px")
    })
```

## .html()

```js
   $("p").bind("click", function(){

      $(this).html("u JS .html() - set the HTML contents of every matched element"); 
   }) 
```     

## $.each() each - static method

```js

   $.each(arr, function(elem, index){

          console.log(elem + ' - ' + index)
   })

```


## $.ajax() Ajax - static method

```js

   $.ajax("GET", "h1.html", function( data ){

        $("h1").html( data )
   })
 
   $("pre code").load("pre.html")

```
# Examples:

[http://thinkphp.ro/apps/js-hacks/ujs/examples/]
[http://thinkphp.ro/apps/js-hacks/ujs/examples/]: http://thinkphp.ro/apps/js-hacks/ujs/examples/