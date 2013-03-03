// hq.js   /mrr 2013-01-27

var nChoices = 4;
var aryOrigLabelHTML = new Array();
var aryHistory = new Array();
var nPage = 0;
var nButtonRadioCorrect = 0;

$(document).ready(function() {
   OnLoad();
});

function OnLoad() {
   var j;
   // I no longer need to save the original HTML of the buttons
   // (early on needed in order to change the text), because I switched
   // to a different, less problematic type of button.
   //for(j=0; j<nChoices; j++) {
   //   aryOrigLabelHTML[j] = $("#house" + (j+1)).html();
   //}
   LoadQuestion();
}

function showMsg(msg) {
   $("#msg").text(msg);
}

function LoadQuestion() {
   //$("#msg").text(++nPage); //new Date().toString());
   var aryHouses = jsonInput["houses"];
   var j;
   var totalHouses = aryHouses.length;
   
   // Reset button colors.
   for(j=0; j<=nChoices; j++) {
      $("#radio" + j).css("background-color","white");
   }
   //alert("#radio1 background-color=" + $("#radio1").css("background-color"));
   
   showRightWrong("", true);
   //alert("# of houses = " + len);
   //alert("third label.html=" + $("#house3").html());
   //alert("third label.text=" + $("#house3").text());
   //alert("third radio.next.text=" + $("radio3").next().text());

   // This shouldn't change anything, but it does.  It changes
   // the styling of the label:
   //alert("before, html=" + $("#house3").html());
   //$("#house3").text($("#house3").text());
   //alert("after, html=" + $("#house3").html());

   //$("#house3").text("  Now set in code  ");
   //$("#house1").text("15032 Yale");

   //var oldhtml1 = $("#house1").html();
   //var html = oldhtml1.replace("!!", "Using replace");
   //alert("oldhtml1=" + oldhtml1 + "\n new html=" + html);
   //$("#house1").html(html);

   
   //$("label[for=radio1]").text("Using label[for= text");
   var idxHouseAnswer = Math.floor(Math.random()*totalHouses);
   //$("#msg").text("page " + (++nPage) + " house " + idxHouseAnswer);
//alert("idxHouseAnswer=" + idxHouseAnswer);
   var houseAnswer = aryHouses[idxHouseAnswer];
   //var key, out1="";
   //for(key in houseAnswer) {
   //   out1 = out1 + " " + key;
   //}
   //showMsg("keys for 0=" + out1);
//alert("houseAnswer=" + houseAnswer);
   var addressHouse = houseAnswer["address"];
   //showMsg("idxHouseAnswer " + idxHouseAnswer + " houseAnswer " + houseAnswer);
   //alert("addressHouse=" + addressHouse);
   var nImagesForHouse = houseAnswer["images"].length;
   var idxImageAnswer = Math.floor(Math.random()*nImagesForHouse);
   var imageName = houseAnswer["images"][idxImageAnswer];
   var urlImage = "images/" + addressHouse + "/" + imageName;
   var urlImage = encodeURI(urlImage);
   $("#mainimage").attr("src", urlImage);
   
   //showMsg("page " + (++nPage) + " idxHouseAnswer " + idxHouseAnswer + " idxImageAnswer " + idxImageAnswer + " urlImage " +urlImage); 

   var aryChoices = new Array();
   aryChoices[0] = idxHouseAnswer;
   // Choose remaining choices.
   for(j=1; j<nChoices; j++) {
      // Loop, choosing a choice until it's not a dup.
      var idxNextPossible;
      do {
         idxNextPossible = Math.floor(Math.random()*totalHouses);
         var k, bDuplicate = false;
         for(k=0; k<j; k++) {
            if(idxNextPossible == aryChoices[k]) {
               bDuplicate = true;
            }
         }
      } while(bDuplicate);
      aryChoices[j] = idxNextPossible;
   }
   // The correct choice is now the first element in aryChoices.
   // That's not very random!  So swap it with a random element.
   j = Math.floor(Math.random()*nChoices);
   var temp = aryChoices[j];
   aryChoices[j] = aryChoices[0];
   aryChoices[0] = temp;
   nButtonRadioCorrect = j+1;

   for(j=0; j<nChoices; j++) {
      //alert("aryChoices[" + j + "]=" + aryChoices[j]);
      var thisHouseAddr = aryHouses[aryChoices[j]]["address"];
      //alert("thisHouseAddr=" + thisHouseAddr);
      // This is the crude hack to get around the fact that setting text
      // on the radio button labels was wiping out some secret HTML 
      // put there by JQuery Mobile.
      //$("#house" +(j+1)).html(aryOrigLabelHTML[j].replace("!!", thisHouseAddr));
      
      //$("#radio" + (j+1) + " .ui-btn-text").text(thisHouseAddr);
      $("#radio" + (j+1)).val(thisHouseAddr);
      $("#radio" + (j+1)).button("refresh");
   }
   //aryHistory.add([idxHouseAnswer, idxImageAnswer]);
}

function showRightWrong(msg, bRight) {
   $("#rightwrong").text(msg);
   // So far I have not figured out a good way to apply a
   // named style, so I'm temporarily hard-coding this.
   var color = (bRight ? "white" : "pink");
   $("#rightwrong").css("color", color);
}

function RespondToTry(nButtonChosen) {
   var msg="Wrong!", bRight = false, color="red";
   if(nButtonChosen == nButtonRadioCorrect) {
      msg = "Correct";
      color = "green";
      bRight = true;
   }
   showRightWrong(msg, bRight);
   //$("#radio" + (nButtonChosen+1)).css("color", "green");
   // This looks bad, but at least it changes something:
   //$("#radio" + (nButtonChosen)).css("background-color",color);
   //$("#radio" + (nButtonChosen)).css("background",color);
   // The theme approach looks nice, but it's odd.  For one thing, if
   // the theme is "a", it changes the button only while the mouse is over it.
   // But it works OK for other themes.  Anyway, I need to make my own themes
   // because none of the built-in ones is the right color.
   if(bRight) {
      $("#radio" + (nButtonChosen)).buttonMarkup({ theme: "c" });
   } else {
      $("#radio" + (nButtonChosen)).buttonMarkup({ theme: "e" });      
   }
   $("#radio" + (nButtonChosen)).refresh();
}

function OnRadio(nButton) {
   //alert("OnRadio here");
   RespondToTry(nButton);
}
