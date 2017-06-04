var name ;
var latitude;
var longitude;
var entity_id;
var entity_type;

function MySearch(){

var place =  document.getElementById('place').value;

    $.ajax({
          type: "post",
          url:  "get.php",
          data: {place:place},
          success: function(response){
            //console.log(response);
             var dat = JSON.parse(response);

             for(var i=0;i<dat.length;i++){
                  name = dat[i]["name"];
                  latitude = dat[i]["latitude"];
                  longitude = dat[i]["longitude"];
                 GetLocation();
                }
              }
          });
      function GetLocation(){

         $.ajax({
                type: "POST",
                url: 'https://developers.zomato.com/api/v2.1/locations?query='+name+'&lat='+latitude+'&lon='+longitude+'&count=10',
                datatype: {name:name, lat:latitude, lon:longitude},
                beforeSend: function setHeader(xhr){
                  xhr.setRequestHeader("Accept", "application/json");
                  xhr.setRequestHeader("user-key", '117609967cb0a51ebd29d1af8e4e43f6');
                },
                success: function(result){

                 var d =result.location_suggestions;
                // console.log(d.location_suggestions.length);
                 //console.log(d.location_suggestions[0]['entity_type']);
                  for(var i=0; i<d.length; i++){
                       entity_type = d[i]['entity_type'];
                       entity_id = d[i]['entity_id'];
                       LocationDetails();
                  }
               }
         });
      }
          function LocationDetails(){

          $.ajax({
                 type:"POST",
                 url: 'https://developers.zomato.com/api/v2.1/location_details?entity_id='+entity_id+'&entity_type='+entity_type,
                 datatype: {entity_type:entity_type, entity_id:entity_id},
                 beforeSend: function setHeader(xhr){
                   xhr.setRequestHeader("Accept", "application/json");
                   xhr.setRequestHeader("user-key", '117609967cb0a51ebd29d1af8e4e43f6');
                 },
                 success: function(result){

                   var res = result.best_rated_restaurant;
                     var panel = $("#panel");
                   for(var i=0;i<res.length;i++){
                      /*  console.log(res[i]['restaurant']['name']);
                        console.log(res[i]['restaurant']['url']);
                        console.log(res[i]['restaurant']['cuisines']);
                        console.log(res[i]['restaurant']['average_cost_for_two']);
                        console.log(res[i]['restaurant']['location']['address']);
                        console.log(res[i]['restaurant']['location']['locality']);
                        console.log(res[i]['restaurant']['location']['city']);
                        console.log(res[i]['restaurant']['user_rating']['aggregate_rating']); */
                        panel.append('<div class="panel panel-primary"><div class="panel-heading">'+ res[i]['restaurant']["name"] +'</div>'+'<div class="panel-body">Address : '+res[i]['restaurant']['location']['address']+ '</div>' + '<div class="panel-body">Locality : '+res[i]['restaurant']['location']['locality']+ '</div>' + '<div class="panel-body"> '+ res[i]['restaurant']['url'] +'<div>' +
                        '<div class="panel-body">Cuisines : ' + res[i]['restaurant']['cuisines'] + '<div class="panel-body">Rating : '+res[i]['restaurant']['user_rating']['aggregate_rating']+ '</div>' + '<div class="panel-body">Avarage cost for two people : '+res[i]['restaurant']['average_cost_for_two']+ '</div>' + '</div></div>')

                      }
                   }

          });

          }
}
