
if ($(".gene-detail-page")[0]) {

  // FOR SEARCH BOX ON INDIVIDUAL GENE PAGES
  // Creates a typeable, autocompleted search box that can be used to search out other genes on the
  // website and jump to their respective pages
  $.getJSON('gene_list.json', function(json) {
    var searchMenuItems = json;
    // Implement the autocomplete feature
    $(function() {
      $("#page-jump").autocomplete({
        source: searchMenuItems
      });
    });

    // Jump to corresponding gene page after text has been entered in the input box and the enter key has been pressed
    // Generate an error message if the name entered was not a valid gene name
    $(function() {
      $("#page-jump").keypress(function(e) {
        if (e.keyCode == 13) {
          if (searchMenuItems.indexOf(this.value.toUpperCase()) >= 0) {
            window.location = this.value.toUpperCase() + ".html";
          } else {
            alert("Gene not found.");
          }
        }
      });
    });

    // Jump to corresponding gene page after text has been entered in the input box and the 'Go to page' button has been clicked on
    // Generate an error message if the name entered was not a valid gene name
    $(function() {
      $("#page-jump-button").click(function() {
        if (searchMenuItems.indexOf($("#page-jump").val()) >= 0) {
          window.location = $("#page-jump").val() + ".html";
        } else {
          alert("Invalid gene name entered.");
        }
      });
    });
  });


} else if ($(".main-page")[0]){
  // FOR SEARCH BOX ON MAIN PAGE
  // Creates a typeable, autocompleted search box that can be used to search out other genes on the
  // website and jump to their respective pages
  $.getJSON('genes/gene_list.json', function(json) {
    var searchMenuItems = json;
    // Implement the autocomplete feature
    $(function() {
      $("#page-jump-main").autocomplete({
        source: searchMenuItems
      });
    });

    // Jump to corresponding gene page after text has been entered in the input box and the enter key has been pressed
    // Generate an error message if the name entered was not a valid gene name
    $(function() {
      $("#page-jump-main").keypress(function(e) {
        if (e.keyCode == 13) {
          if (searchMenuItems.indexOf(this.value.toUpperCase()) >= 0) {
            window.location = "genes/" + this.value.toUpperCase() + ".html";
          } else {
            alert("Gene not found.");
          }
        }
      });
    });

    // Jump to corresponding gene page after text has been entered in the input box and the 'Go to page' button has been clicked on
    // Generate an error message if the name entered was not a valid gene name
    $(function() {
      $("#page-jump-button-main").click(function() {
        if (searchMenuItems.indexOf($("#page-jump-main").val()) >= 0) {
          window.location = "genes/" + $("#page-jump-main").val() + ".html";
        } else {
          alert("Invalid gene name entered.");
        }
      });
    });
  });
}


// FOR TABLE HIDE/SHOW SEARCH TEXT INPUT BOX ON MAIN PAGE
// Show only rows whose gene name contains the string entered into the search box
$(".main-search-sort").keyup(function() {
  var enteredText = $(this).val().toUpperCase();
  var enteredTextLength = enteredText.length;

  $(".gene").each(function() {
    var geneName = $(this).text().toUpperCase();
    var counter = 0;

    while (true) {
      var geneTextPiece = "";
      var match = false;

      for (j = 0; j < enteredTextLength; j++) {
        if (geneName[counter + j] === undefined) {
          geneTextPiece = undefined;
          break;
        } else {
        geneTextPiece += geneName[counter + j]
        }
      }
      if (geneTextPiece === undefined) {
        break;
      }
      if (geneTextPiece === enteredText) {
        match = true;
        break;
      }
      counter += 1;
    }
    if (match === true) {
      $(this).parent().show();
    } else {
      $(this).parent().hide();
    }
  });
});
