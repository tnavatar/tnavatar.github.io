// Used to show column in individual genes pages when the corresponding label in the drop-down menu is selected,
// and hide the column when it is unselected.

// Create drop-down menu for main page listing column names using using code specified by jquery.sumoselect.js plugin
$(document).ready(function () {
  $("#show-hide-menu").SumoSelect({
                        csvDispCount: 3,
                        captionFormat: "All Tiers Selected",
                        forceCustomRendering: true
  });
});

// Hide columns that are not selected by default
$("#show-hide-menu option:not(:selected)").each(function() {
  var column = "table ." + $(this).attr("value");
  $(column).hide();
});

// Toggle show/hide depending on whether the drop down menu item is selected/unselected
$("#show-hide-menu").change(function() {
  $("#show-hide-menu option").each(function() {
    if ($("#show-hide-menu").val().indexOf($(this).attr("value")) > -1) {
      $("." + $(this).attr("value")).show();
    } else {
      $("." + $(this).attr("value")).hide();
    }
  });
});


// ----------------------------------------------------------------------------
// Create drop-down menu for individual gene pages listing column names using using code specified by jquery.sumoselect.js plugin
$(document).ready(function () {
  $("#show-hide-menu2").SumoSelect({
                        csvDispCount: 1,
                        forceCustomRendering: true
  });
});

// Hide columns that are not selected by default
$("#show-hide-menu2 option:not(:selected)").each(function() {
  var column = "table ." + $(this).attr("value");
  $(column).hide();
});

// Toggle show/hide depending on whether the drop down menu item is selected/unselected
$("#show-hide-menu2").change(function() {
  $("#show-hide-menu2 option").each(function() {
    if ($("#show-hide-menu2").val().indexOf($(this).attr("value")) > -1) {
      $("." + $(this).attr("value")).show();
    } else {
      $("." + $(this).attr("value")).hide();
    }
  });
});
