$(document).ready(function() {
  $("button#hide_h2").click(function() {
    $("h2").hide(500);
  });

  $("button#show_h2").click(function() {
    $("h2").show(300);
    $("h2").css("color", "blue");
    $("h2").html("You clicked me hard.");
  });

  $("button#clear_screen").click(function() {
    var $x = $("container");
    $x.empty();
  });

  $("button#get_data").click(function() {
    var items = [];
    var i = 0;
    var airtable_read_endpoint =
      "https://api.airtable.com/v0/app8JpknoQTchY1HL/Info?api_key=keyDQXt27JtFQ0kXk";
    var dataSet = [];
    $.getJSON(airtable_read_endpoint, function(result) {
      console.log("result");
      console.log(result);
      $.each(result.records, function(key, value) {
        items = [];
        items.push(value.fields.Date_of_purchase);
        items.push(value.fields.Stage_Desc);
        items.push(value.fields.Completed);
        items.push(value.fields.Time_Estimate);
        items.push(value.fields.Weight_Factor);
        items.push(value.fields.converted);
        dataSet.push(items);
        console.log(items);
      }); // end .each
      console.log(dataSet);

      $("#example").DataTable({
        data: dataSet,
        retrieve: true,
        columns: [
          { title: "Name", defaultContent: "" },
          { title: "Stage", defaultContent: "" },
          { title: "Completed", defaultContent: "" },
          { title: "Time Estimated", defaultContent: "" },
          { title: "Weight Factor", defaultContent: "" },
          { title: "Converted", defaultContent: "" }
        ]
      });
    }); // end .getJSON
  }); // end button

  $("button#roll_up").click(function() {
    var table1_items = [];
    var i = 0;
    var airtable_read_endpoint =
      "https://api.airtable.com/v0/appsgGTkZbQQG52UE/Purchase%20history?api_key=keyDQXt27JtFQ0kXk";
    var table1_dataSet = [];
    $.getJSON(airtable_read_endpoint, function(result) {
      console.log("result");
      //console.log(result)

      console.log(JSON.stringify(result));
      $.each(result.records, function(key, value) {
        table1_items = [];
        table1_items.push(value.fields.Product_name);
        table1_items.push(value.fields.Date_of_purchase);
        if (value.fields.Photo != undefined) {
          table1_items.push(
            "<img src='" + value.fields.Photo[0].url + "' width='24'>"
          );
        } else {
          table1_items.push("");
        }
        table1_items.push(value.fields.Brand);
        table1_items.push(value.fields.Product_category);
        table1_items.push(value.fields.color);
        table1_items.push(value.fields.Selling_price_HKD);
        table1_items.push(value.fields.Source);
        table1_items.push(value.fields.Repurchase);
        table1_dataSet.push(table1_items);
        //console.log(table1_items);
      }); // end .each
      console.log(table1_dataSet);

      $("#table1").DataTable({
        data: table1_dataSet,
        retrieve: true,
        columns: [
          { title: "Product name", defaultContent: "" },
          { title: "Date of purchase", defaultContent: "" },
          { title: "Photo", defaultContent: "" },
          { title: "Brand", defaultContent: "" },
          { title: "Product Category", defaultContent: "" },
          { title: "Color", defaultContent: "" },
          { title: "Selling price", defaultContent: "" },
          { title: "Source", defaultContent: "" },
          { title: "Repurchase", defaultContent: "" }
        ]
      });
    }); // end .getJSON

    var table2_items = [];
    var i = 0;
    var airtable_read_endpoint =
      "https://api.airtable.com/v0/appsgGTkZbQQG52UE/Purchase%20history?api_key=keyDQXt27JtFQ0kXk";
    var table2_dataSet = [];
    $.getJSON(airtable_read_endpoint, function(result) {
      $.each(result.records, function(key, value) {
        table2_items = [];
        table2_items.push(value.fields.Product_name);
        table2_items.push(value.fields.Selling_price_HKD);
        table2_dataSet.push(table2_items);
        console.log(table2_items);
      }); // end .each
      console.log(table2_dataSet);
      $("#table2").DataTable({
        data: table2_dataSet,
        retrieve: true,
        ordering: false,
        columns: [
          { title: "Product name", defaultContent: "" },
          { title: "Selling price HKD", defaultContent: "" }
        ] // rmf columns
      }); // end dataTable

      var chart = c3.generate({
        data: {
          columns: table2_dataSet,
          type: "bar"
        },
        axis: {
          x: { label: "Stage" },
          y: { label: "# of Entries" }
        },
        bar: {
          title: "Tasks for Each Stage:"
        }
      });
    }); // end .getJSON
  }); // end button

  // $.getJSON('http://localhost/d756a/data_export.json/Computer+TV', function(obj) {
}); // document ready
