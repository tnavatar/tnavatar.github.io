// Highlights the appropriate reference in the 'References' section in the
// individual genes pages when the link to it in the table is clicked on

$(".refs").click(function() {
  var clicked_pmid = $(this).attr("id");

  $(".ref").each(function(index) {
    if ($(this).attr("id") === clicked_pmid) {
      this.style.background = "#e2f6ff";
    } else {
      this.style.background = "white";
    };
  });
});

// Open links to PubMed website in a new window
$(".ref").find("a[href^='http://']").attr("target","_blank");
