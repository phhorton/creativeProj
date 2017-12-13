$(document).ready(function(){
  $("#postReport").click(function(){
      var myobj = {Title:$("#title").val(),Report:$("#report").val()};
      jobj = JSON.stringify(myobj);
      var titleName = $("#title").val();
      $("#json").text("Successfully inserted " + titleName + "!");
      $("#reports").html("<ul></ul>");
      var url = "/report";
      $.ajax({
           url:url,
           type: "POST",
           data: jobj,
           contentType: "application/json; charset=utf-8",
           success: function(data,textStatus) {
                 console.log(data);
           }
      })
  });


  $("#getReport").click(function() {
    $.getJSON('/report', function(data) {
      console.log(data);
      $("#json").text("");
      var everything = "<ul>";
      for(var report in data) {
        rpt = data[report];
        everything += "<li> Title: " + rpt.Title + " -- Report: " + rpt.Report + "</li>";
      }
      everything += "</ul>";
      $("#reports").html(everything);
    })
  });

  
  $('#deleteReports').click(function() {
    var url = "/report";
    $("#json").text("");
    $.ajax({
      url: url,
      type: "DELETE",
      contentType: "application/json; charset=utf-8",
      success: function(data, textStatus) {
        console.log("Cleared");
        $("#reports").html("<ul></ul>");
      }
    })
  });

});
