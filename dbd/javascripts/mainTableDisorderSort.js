
// Simulate a click on the hidden column header when the corresponding button is clicked
var counter = 0;
$(".data-sort-button").click(function() {
  var clickedSortButtonId = $(this).attr("id");

  // Obtain the disorder abbreviation for the legend item that was clicked on
  var disorderAbbrev = "";
  for (i = 0; i < clickedSortButtonId.length - 1; i++) {
    if (clickedSortButtonId[i] === "-") {
      break;
    }
    disorderAbbrev += clickedSortButtonId[i];
  }
  // Included if statement for double click in order to address the fact that it
  // was not triggering on the first click after refreshing
  if (counter === 0) {
    $("#" + disorderAbbrev + "-frequency").trigger("click");
    counter += 1;
  }
  $("#" + disorderAbbrev + "-frequency").trigger("click");

  // If one of the table header legend items are clicked on, put a sort symbol next to it
  // Remove any sort order symbol appended other column headers
  $(".main-data-sort").each(function(index) {
    $(".main-data-sort").find("span").removeClass();
  });

  // Remove any sort order symbol appended to this and other legend items
  $(".data-sort-figure").find("span").each(function() {
    $(this).removeClass("glyphicon glyphicon-sort-by-order glyphicon-sort-by-order-alt");
    $(".inner-span").css("margin-left", "0.6em");
  });

  // Append appropriate symbol to table header legend item that was clicked on
  if ($("." + disorderAbbrev + "-frequency:first").text() < $("." + disorderAbbrev + "-frequency:last").text()) {
    $(".space-span-" + disorderAbbrev).addClass("glyphicon glyphicon-sort-by-order");
    $(".space-span-" + disorderAbbrev).css("margin-left", "0.15em");
  } else if ($("." + disorderAbbrev + "-frequency:first").text() > $("." + disorderAbbrev + "-frequency:last").text()) {
    $(".space-span-" + disorderAbbrev).addClass("glyphicon glyphicon-sort-by-order-alt");
    $(".space-span-" + disorderAbbrev).css("margin-left", "0.15em");
  }
});

// Append spans to text in table headers
$(".main-data-sort").each(function(index) {
  $(this).append(' <span></span>');
});

// Put the appropriate sort symbol next to the text in the column header that was clicked on to sort
$(".main-data-sort").click(function() {
  var clickedHeader = $(this).attr("data-sort");
  var clickedHeaderId = $(this).attr("id");

  $(".data-sort-figure").find("span").each(function() {
    $(this).removeClass("glyphicon glyphicon-sort-by-order glyphicon-sort-by-order-alt");
    $(".inner-span").css("margin-left", "0.6em");
  });

  $(".main-data-sort").each(function(index) {
    if ($(this).attr("id") === clickedHeaderId) {
      // Remove any previous symbol on clicked column header
      $(this).find("span").removeClass();
      $("#fig-col-header-symbol").removeClass();

      // Append appropriate symbol
      if (clickedHeader === "gene") {
        if ($("." + clickedHeader + ":first").text() < $("." + clickedHeader + ":last").text()) {
          $(this).find("span").addClass("glyphicon glyphicon-sort-by-alphabet");
        } else if ($("." + clickedHeader + ":first").text() > $("." + clickedHeader + ":last").text()) {
          $(this).find("span").addClass("glyphicon glyphicon-sort-by-alphabet-alt");
      }} else {
        if ($("." + clickedHeader + ":first").text() < $("." + clickedHeader + ":last").text()) {
          $(this).find("span").addClass("glyphicon glyphicon-sort-by-order");
        } else if ($("." + clickedHeader + ":first").text() > $("." + clickedHeader + ":last").text()) {
          $(this).find("span").addClass("glyphicon glyphicon-sort-by-order-alt");
      }}
    } else {
      // Remove sort symbol from any column that is not currently being used to sort
      $(this).find("span").removeClass();
    };
  });
});

// Sort by alphabetical order (A-Z) by default when the main page is first pulled up or refreshed
$(document).ready(function() {
  $("#gene-sort").trigger("click");
});
