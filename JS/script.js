
var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $caption = $("<p></p>");
var $nextPhoto = $("#nextPhoto");
var $prevPhoto = $("#prevPhoto");
var itemArray = []; // create array to fill with images
var counter = 0;
//OVERLAY

//add image to overlay

$overlay.append($image);

//add caption to overlay

$overlay.append($caption);

// add overlay to body

$("body").append($overlay);

// when image is clicked..
$('#imageGallery a').click(function(event){
event.preventDefault();
counter = 0;
i = 0;
var imageLocation = $(this).attr("href");
$('#imageGallery a').each(function(){
  i++;
  if ($(this).attr("href") === imageLocation ) {
          counter = i - 1;
  }
});

// grab image
$image.attr("src", imageLocation);

// grab overlay
$overlay.fadeIn();

// grab caption (child's alt attribute)
var captionText = $(this).children("img").attr("alt");
$caption.text(captionText);

// grab arrows
$overlay.append($prevPhoto);
$overlay.append($nextPhoto);

});

//hide overlay when clicked

$overlay.click(function(){
$overlay.fadeOut();

});

// fill array with items

function populateArray() {
$(".photo a").each(function() {
var itemObject = {
                itemURL : $(this).attr("href"),
			          itemCaption : $(this).children("img").attr("alt"),
			          itemType : "image"
              };
                itemArray.push(itemObject);

});
}


// SEARCH

// 1) hide all items
// 2) find item whose alt contains those characters
// 3) show these items

var $items = $(".photo"); // get all the elements

$("#search").keyup(function() {
var term = $.trim($(this).val()).toLowerCase();
$items.each(function(){
// get the caption text
var altText = $(this).children("a").children("img").attr("alt").toLowerCase();
// check inside the caption text
if (altText.indexOf(term) > -1) {
	$(this).removeClass("hide").fadeIn(); // show elements that fulfill the search criteria
} else {
	$(this).fadeOut().addClass("hide"); // hide elements that don't fulfill search criteria
}

});
});

populateArray();

// when in overlay (after searching) - hide elements that don't match criteria

// ARROWS

function getNextItem() {
// check if counter is at the end. if not, +1
// else, go back to first image
if (counter < itemArray.length - 1 && counter >= 0) {
counter++;
} else {
counter = 0;
}
updateOverlay();
}

function getPrevItem() {
// check if counter is at the beginning. if not, -1
// else, go back to last image
if (counter <= itemArray.length - 1 && counter > 0) {
counter--;
} else {
counter = itemArray.length - 1;
}
updateOverlay();
}

function updateOverlay() {

$image.attr("src", itemArray[counter].itemURL);
$caption.text(itemArray[counter].itemCaption);

// animate the image
$image.hide();
$image.fadeIn();

// show captions
$caption.hide();
$caption.fadeIn();

}

//when next is clicked
$nextPhoto.click(function(event) {
getNextItem(1);
return false;
});

//when previous is clicked
$prevPhoto.click(function(event) {
getPrevItem(-1);
return false;
});
