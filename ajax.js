var PRIV_KEY = "34360a6a43a8e86c2fb19864e2a9a7163c0fe229";
var PUBLIC_KEY = "487e45cb90f29ff2d11b7e9475ebe67b";
var data;
var results;
var nameStartsWith;



function autocompletion(value) {
    var ts = new Date().getTime();

    var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
    
    var url = 'http://gateway.marvel.com:80/v1/public/characters?nameStartsWith='+ value +'&ts='+ ts +'&apikey='+ PUBLIC_KEY +'&hash=' + hash;

    $( "#search" ).autocomplete({
      source: function (request, response) {
           $.ajax({
            dataType:"json",
            url: url,
            data:data,
            success:function(data){
                results = data.data.results;
                
                var name = [];
                   $.each(results, function(i, item) {
                       name.push(results[i].name);
                   });
                response(name.slice(0,5));
                
             }
            });
      },
      minLength: 3,
      select: function( event, ui ) {
          console.log(results);
          console.log( "Selected: " + ui.item.value);
          var image = []; 
          var extension = []; 
          var name = [];
          var desc = [];
          var comics = []; 
          var comicsItem = [];
          
          $.each(results, function(i) {
            if (ui.item.value === results[i].name){
             image.push(results[i].thumbnail.path);
             extension.push(results[i].thumbnail.extension);
             name.push(results[i].name);
             desc.push(results[i].description); 
              comicsItems = results[i].comics.items;                   
            }
          });
          
          $("#result").append('<h2> '+ name +'</h2><p> ' + desc + '</p><img style="width:300px;" src=\' ' + image + '.' + extension + '\'/>');
          $("body").css('background-image' , 'url(" ' + image + '.'+ extension + '")');
          $("body").css('background-repeat' , 'no-repeat');
          for (var j=0; j<5; j++) {
            $("#result").append('<li> ' + comicsItems[j].name + '</li>'); 
          }
      }   
    });
}

$("#search").on('input', function() {
    var value = $("#search").val();
    autocompletion(value); 
});

