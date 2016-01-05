// Add in symbols showing sort order on individual genes pages tables

// Append spans to individual genes pages table headers
$(".visible-col").each(function(index) {
  $(this).append(' <span></span>');
});

var clickCounter = 0;
var clickHash = {};
$(".visible-col").each(function(index) {
  clickHash[$(this).attr("data-sort")] = 0;
});

// When the "Reference" column header is clicked on, sort by date, but make sure the cases remain grouped by study
// Accomplish this by sorting by PMID using hidden "PMID" column, then sorting by date usings hidden "Date" column
var refClickCounter = 0;
$("#reference-col-header").click(function() {
  refClickCounter += 1;
// Must alternate the number of clicks on column headers in order to cause the sort order to change
  if (refClickCounter % 2 === 1) {
    $(".the_pmid").trigger("click");
    $(".the_pmid").trigger("click");
    $(".date").trigger("click");
  } else {
    $(".the_pmid").trigger("click");
    $(".date").trigger("click");
    $(".date").trigger("click");
  }
});

// Append appropriate symbol to span in column header that was clicked on to sort
$(".visible-col").click(function() {
  var clickedHeader = $(this).attr("data-sort");
  clickCounter += 1;

  // Reset the hash if they click on a different table header
  if (clickCounter > 0 && clickHash[clickedHeader] === 0) {
    $(".visible-col").each(function(index) {
      clickHash[$(this).attr("data-sort")] = 0;
      clickCounter = 1;
    });
  }
  // Add a click count to the hash for the appropriate column header
  clickHash[clickedHeader] += 1;

  $(".visible-col").each(function(index) {
    if ($(this).attr("data-sort") === clickedHeader) {

      var counter2 = 0;
      $("." + clickedHeader).each(function() {
        if ($(this).text() !== "" && counter2 < 1) {
          counter2 += 1;
          $(this).addClass("top-value-" + clickedHeader);
        } else {
          $(this).removeClass("top-value-" + clickedHeader);
        }
      });

      // Append appropriate symbol
      // If this is the first consecutive click on the column, use the logic below to decide which symbol to append
      if (clickCounter < 2) {
        // Remove any previous symbol on clicked column header
        $(this).find("span").removeClass();

      if (clickedHeader === "chromosome1" || clickedHeader === "cnv_size1" || clickedHeader === "coding_dna_change1" || clickedHeader === "genome_build1" || clickedHeader === "position1") {
        if ($(".top-value-" + clickedHeader).text() < $("." + clickedHeader + ":last").text()) {
          $(this).find("span").addClass("glyphicon glyphicon-sort-by-order");
        } else if ($(".top-value-" + clickedHeader).text() > $("." + clickedHeader + ":last").text()) {
          $(this).find("span").addClass("glyphicon glyphicon-sort-by-order-alt");

      }} else if (clickedHeader === "the_reference1") {
        if ($(".date1:first").text() < $(".date1:last").text()) {
          $(this).find("span").addClass("glyphicon glyphicon-sort-by-order");
        } else if ($(".date1:first").text() > $(".date1:last").text()) {
          $(this).find("span").addClass("glyphicon glyphicon-sort-by-order-alt");

      }} else {
        if ($("." + clickedHeader + ":first").text() < $("." + clickedHeader + ":last").text()) {
          $(this).find("span").addClass("glyphicon glyphicon-sort-by-alphabet");
        } else if ($("." + clickedHeader + ":first").text() > $("." + clickedHeader + ":last").text()) {
          $(this).find("span").addClass("glyphicon glyphicon-sort-by-alphabet-alt");

      // If this is the second or greater consecutive time that column header has been clicked on,
      // simply append the opposite symbol to the one that was already appended there
      }}} else {
        if ($(this).find("span").attr("class") === "glyphicon glyphicon-sort-by-order") {
          $(this).find("span").removeClass()
          $(this).find("span").addClass("glyphicon glyphicon-sort-by-order-alt");

        } else if ($(this).find("span").attr("class") === "glyphicon glyphicon-sort-by-order-alt") {
          $(this).find("span").removeClass()
          $(this).find("span").addClass("glyphicon glyphicon-sort-by-order");

        } else if ($(this).find("span").attr("class") === "glyphicon glyphicon-sort-by-alphabet") {
          $(this).find("span").removeClass()
          $(this).find("span").addClass("glyphicon glyphicon-sort-by-alphabet-alt");

        } else if ($(this).find("span").attr("class") === "glyphicon glyphicon-sort-by-alphabet-alt") {
          $(this).find("span").removeClass()
          $(this).find("span").addClass("glyphicon glyphicon-sort-by-alphabet");
        }
      }
    } else {
      // Remove sort symbol from any column that is not currently being used to sort
      $(this).find("span").removeClass();
    };
  });
});

// Sort by alphabetical order (A-Z) by default when the main page is first pulled up or refreshed
$(document).ready(function() {
  $("#reference-col-header").trigger("click");
});
