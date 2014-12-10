/*===================================================================================================== 
HELP FUNCTION
===================================================================================================== */
function $() {
    var elements = [];
    for (var i = 0; i < arguments.length; i++) {
        var element = arguments[i];
        if (typeof element === 'string') {
            element = document.getElementById(element);
        }
        if (arguments.length === 1){
            return element;
        }
        elements.push(element);
    }
    return elements;
}
var helpID = "";
function showHelp(sTerm){
    if ($(sTerm + '-content')){ //  IF HELP HAS ALREADY BEEN CALLED - SHOW IT
        if ($(sTerm + '-content').className === "help-bubble"){
            clearhelp();    //  CLEAR OLD HELP ITEM
            return false;
        }else{
            clearhelp();    //  CLEAR OLD HELP ITEM
            helpID = sTerm;
            //  HELP POSITIONING
            if(Modernizr.mq('only screen and (max-width: 789px)')) { // NO COLS
                $(sTerm + '-content').style.top = $(helpID).parentNode.offsetHeight + 5 + "px";
                // $(sTerm + '-content').style.left = "0";
            }else{
                $(sTerm + '-content').style.top = "48px";
                // $(sTerm + '-content').style.left = "0";
            }  // true
            $(helpID + '-content').className = "help-bubble";
        }
    }else{  //  ELSE - CALL HELP
        clearhelp();    //  CLEAR OLD HELP ITEM
        helpID = sTerm;
        //  CREATE NODE
        var oDiv = document.createElement("div");
        oDiv.className = 'help-bubble';
        oDiv.id = helpID + "-content";
        //  HELP POSITIONING        //if (helpPosition=='relative'){oDiv.style.left = $(helpID).offsetLeft + 40 + "px";}    //  REMOVE TO USE CSS ONLY (STATIC) POSITIONING
        if(Modernizr.mq('only screen and (max-width: 789px)')) { // NO COLS
            oDiv.style.top = $(helpID).parentNode.offsetHeight + 5 + "px";
            // oDiv.style.left = "0";
        }else{
            oDiv.style.top = "48px";
            // oDiv.style.left = "0";
        }  
        oDiv.innerHTML = "<div class='help-bubble__content'><h5 class='help-bubble__header'>Test</h5><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. link Quisque sed fringilla ipsum.</p><ul><li>One</li><li>Two</li></ul><p>Suspendisse ut sem augue. Suspendisse sed magna a neque pretium aliquet. Sed justo dolor, bibendum vehicula imperdiet nec. </p><a href='javascript:clearhelp();' class='help-bubble__close-link' title='Close'>x</a></div>";
        $(helpID).parentNode.insertBefore(oDiv, $(helpID).nextSibling);
    }
    return false;
}

function clearhelp(){
    sID = helpID + "-content";
    if (!helpID){return;}
    $(sID).className = "help-bubble is-hidden";
}
    