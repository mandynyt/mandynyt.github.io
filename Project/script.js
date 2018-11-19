
$("button#unidata").click(function() {
  var table1_items = [];
  var i = 0;
  var airtable_read_endpoint = "https://api.airtable.com/v0/appsgGTkZbQQG52UE/Purchase%20history?api_key=keyDQXt27JtFQ0kXk";
  var table1_dataSet = [];
  $.getJSON(airtable_read_endpoint, function(result) {
         $.each(result.records, function(key,value) {
             table1_items = [];
                 table1_items.push(value.fields.Product_name);
                 table1_items.push(value.fields.Date_of_purchase);
                  table1_items.push('<td><img src="' + value.fields.Photo + '" style="width: 90px;"/></td>');
                 table1_items.push(value.fields.Brand);
                 table1_items.push(value.fields.Product_category);
                 table1_items.push(value.fields.color);
                 table1_items.push(value.fields.Selling_price_HKD);
                 table1_dataSet.push(table1_items);
          }); // end .each


       $('#table1').DataTable( {
           data: table1_dataSet,
           retrieve: true,
           columns: [
               { title: "Product name",
                 defaultContent:""},
               { title: "Date of purchase",
                   defaultContent:"" },
               { title: "Photo",
                 defaultContent:"" },
               { title: "Brand",
                 defaultContent:""},
               { title: "Product Category",
                   defaultContent:""},
               { title: "Color",
                 defaultContent:""},
               { title: "Selling price",
                   defaultContent:""},

           ]
       } );
  }); // end .getJSON

    var table2_items = [];
    var i = 0;
    var airtable_read_endpoint =
    "https://api.airtable.com/v0/appsgGTkZbQQG52UE/Purchase%20history?api_key=keyDQXt27JtFQ0kXk";
    var table2_dataSet = [];
    $.getJSON(airtable_read_endpoint, function(result) {
           $.each(result.records, function(key,value) {
               table2_items = [];
                   table2_items.push(value.fields.Product_name);
                   table2_items.push(value.fields.Selling_price_HKD);
                   table2_dataSet.push(table2_items);
                   console.log(table2_items);
            }); // end .each
            console.log(table2_dataSet);


           var chart = c3.generate({
                data: {
                    columns: table2_dataSet,
                    type : 'bar'
                },
                axis: {
                    x: {
                        label: 'Product'
                    },
                    y: {
                        label: 'Selling price'
                    },
                }
            });

     }); // end .getJSON
  }); // end button
//}); // document ready
