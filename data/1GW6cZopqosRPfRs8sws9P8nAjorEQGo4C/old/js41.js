
//these need to be global vars for now - until can handle better
  var length = 0;
  var BackCorner = 0;
  var DownWall = 0;
  var TheTee = 0;
  var WatchBall = 0;
  var MakeOppRun = 0;
  var VolleyWhenPoss = 0;
  var DelayWhenPoss = 0;
  var ChangePace = 0;
  var GoShortInitiative = 0;

  //process whichever button that is pressed
  document.getElementById("LengthBtn").onclick = process;
  document.getElementById("BackCornerBtn").onclick = process;
  document.getElementById("DownWallBtn").onclick = process;
  document.getElementById("TBtn").onclick = process;
  document.getElementById("WatchBallBtn").onclick = process;
  document.getElementById("MakeOppRunBtn").onclick = process;
  document.getElementById("VolleyWhenPossBtn").onclick = process;
  document.getElementById("DelayWhenPossBtn").onclick = process;
  document.getElementById("ChangePaceBtn").onclick = process;
  document.getElementById("GoShortInitiativeBtn").onclick = process;


  //main function for responding to button clicks and processing
  function process() {

	 alert('here');
	  alert(document.getElementById(this.id).style.backgroundColor);
      var Total = 0;
                         if(document.getElementById(this.id).style.backgroundColor === "rgb(136, 99, 112)"){

                           setTextToDisplay(this.id);
                           document.getElementById(this.id).style.backgroundColor = "green";
                           setButtonVarVal(this.id);

                         }else if (document.getElementById(this.id).style.backgroundColor == "green"){

                           document.getElementById(this.id).style.backgroundColor = "red";
                            setTextToDisplay(this.id);
                           resetSkillValIfAlreadyClicked(this.id);

                         }

                        Total = AddUpAllTheValues();

                       setIndicator(Total);

            }//end of function Process

  //text to display in the dialoge box
  function setTextToDisplay(){
	  
	  alert(arguments[0]);

                          if(arguments[0] == 'LengthBtn'){
                              textToDisplay.textContent = "Your highest priority good length is";

                          }
                         else if(arguments[0] == 'BackCornerBtn'){
                              textToDisplay.textContent = "Keep your opponent guessing you must";

                         }

                         else if(arguments[0] == 'DownWallBtn'){
                                    textToDisplay.textContent = "Keep ball tight you must. Especially at front";

                         }
                         else if(arguments[0] == 'TBtn'){
                                    textToDisplay.textContent = "The T must be covered ... always";

                         }
                         else if(arguments[0] == 'WatchBallBtn'){
                                    textToDisplay.textContent = "Focus on the ball at all times";

                         }
                         else if(arguments[0] == 'MakeOppRunBtn'){
                                    textToDisplay.textContent = "Opponent run he must";

                         }
                         else if(arguments[0] == 'VolleyWhenPossBtn'){
                                    textToDisplay.textContent = "Use the volley whenever possible";

                         }
                         else if(arguments[0] == 'DelayWhenPossBtn'){
                                   textToDisplay.textContent = "Delay you can and should";

                         }
                         else if(arguments[0] == 'ChangePaceBtn'){
                                    textToDisplay.textContent = "Pace change you can and should";

                         }
                         else if(arguments[0] == 'GoShortInitiativeBtn'){
                                    textToDisplay.textContent = "When initiative you have, go short you must";

                         }

  }

   //set the global vars to reflect if button pressed or not
  function setButtonVarVal(){

                         if(arguments[0] == 'LengthBtn'){

                           length = length + 24;

                          }
                         else if(arguments[0] == 'BackCornerBtn'){
                              BackCorner = BackCorner + 18;

                         }

                         else if(arguments[0] == 'DownWallBtn'){
                                    DownWall = DownWall + 14;

                         }
                         else if(arguments[0] == 'TBtn'){
                                    TheTee = TheTee + 11;

                         }
                         else if(arguments[0] == 'WatchBallBtn'){
                                    WatchBall = WatchBall + 8;

                         }
                         else if(arguments[0] == 'MakeOppRunBtn'){
                                    MakeOppRun = MakeOppRun + 7;

                         }
                         else if(arguments[0] == 'VolleyWhenPossBtn'){
                                    VolleyWhenPoss = VolleyWhenPoss + 6;

                         }
                         else if(arguments[0] == 'DelayWhenPossBtn'){
                                    DelayWhenPoss = DelayWhenPoss + 5;

                         }
                         else if(arguments[0] == 'ChangePaceBtn'){
                                    ChangePace = ChangePace + 4;

                         }
                         else if(arguments[0] == 'GoShortInitiativeBtn'){
                                    GoShortInitiative = GoShortInitiative + 3;

                         }

  }//end of function setButtonVarVal

  //re-set value if user changes mind
  function resetSkillValIfAlreadyClicked(){

    //alert(arguments[0]);

                         if(arguments[0] == 'LengthBtn'){
                          length = 0;
                          }
                         else if(arguments[0] == 'BackCornerBtn'){
                                    BackCorner = 0;
                         }
                         else if(arguments[0] == 'DownWallBtn'){
                                    DownWall = 0;
                         }
                         else if(arguments[0] == 'TBtn'){
                                    TheTee = 0;
                         }
                         else if(arguments[0] == 'WatchBallBtn'){
                                    WatchBall = 0;
                         }
                         else if(arguments[0] == 'MakeOppRunBtn'){
                                    MakeOppRun = 0;
                         }
                         else if(arguments[0] == 'VolleyWhenPossBtn'){
                                    VolleyWhenPoss = 0;
                         }
                         else if(arguments[0] == 'DelayWhenPossBtn'){
                                    DelayWhenPoss = 0;
                         }
                         else if(arguments[0] == 'ChangePaceBtn'){
                                    ChangePace = 0;
                         }
                         else if(arguments[0] == 'GoShortInitiativeBtn'){
                                    GoShortInitiative = 0;
                         }

}//end of function resetSkillValIfAlreadyClicked

  //get a running total
  function AddUpAllTheValues(){

    var AddUpAllTheValues =
          length +
          BackCorner +
          DownWall +
          TheTee +
          WatchBall +
          MakeOppRun +
          VolleyWhenPoss +
          DelayWhenPoss +
          ChangePace +
          GoShortInitiative;

    return AddUpAllTheValues;

  }

  //set the appropriate images and status bar values according to the current running total
  function setIndicator(Total){

    //put getElementById in a var to manipulate it
     var x = document.getElementById("progressbarToDisplay");

     //alert(Total);
     //check if any of top three are 0 in which case indicator will show only '20%'
           if(length === 0 || BackCorner === 0 || DownWall === 0){
      //alert('length' + length + 'bc'+ BackCorner + 'dw' + DownWall);
              document.getElementById("displayImage").src = 'images/jabba the hut 150.jpg';
              document.getElementById('progressbarToDisplay').innerHTML = "20%";
              document.getElementById('progressbarToDisplay').style.width = "20%";
             //
              //textToDisplay.textContent = "Good length, width and corners all essential they are ...";
              x.classList = "";
              x.classList.add("w3-container", "w3-center", "w3-red", "w3-margin", "w3-xxlarge");

           }else if (Total < 55 ){
              document.getElementById("displayImage").src = 'images/bb8 150.jpg';
              document.getElementById('progressbarToDisplay').innerHTML = "50%";
              document.getElementById('progressbarToDisplay').style.width = "50%";
              x.classList = "";
              x.classList.add("w3-container", "w3-center", "w3-amber", "w3-margin", "w3-xxlarge");

            } else if (Total >= 55 && Total < 67){

              document.getElementById("displayImage").src = 'images/bb8 150.jpg';
              document.getElementById('progressbarToDisplay').innerHTML = "56%";
              document.getElementById('progressbarToDisplay').style.width = "56%";
              x.classList = "";
              x.classList.add("w3-container", "w3-center", "w3-pink", "w3-margin", "w3-xxlarge");

            }else if (Total >= 66 && Total < 75){
              document.getElementById("displayImage").src = 'images/rey 150.jpg';
              document.getElementById('progressbarToDisplay').innerHTML = "67%";
              document.getElementById('progressbarToDisplay').style.width = "67%";
              x.classList = "";
              x.classList.add("w3-container", "w3-center", "w3-khaki", "w3-margin", "w3-xxlarge");
            }

        	else if (Total >= 74 && Total < 82){

              document.getElementById("displayImage").src = 'images/rey 150.jpg';
              document.getElementById('progressbarToDisplay').innerHTML = "75%";
              document.getElementById('progressbarToDisplay').style.width = "75%";
              x.classList = "";
              x.classList.add("w3-container", "w3-center", "w3-brown", "w3-margin", "w3-xxlarge");
            }

       else if (Total >= 81 && Total < 88){
           document.getElementById("displayImage").src = 'images/obi wan 150.jpg';
              document.getElementById('progressbarToDisplay').innerHTML = "82%";
              document.getElementById('progressbarToDisplay').style.width = "82%";
              x.classList = "";
              x.classList.add("w3-container", "w3-center", "w3-light-blue", "w3-margin", "w3-xxlarge");
            }

       else if (Total >= 87 && Total < 93){
           document.getElementById("displayImage").src = 'images/obi wan 150.jpg';
              document.getElementById('progressbarToDisplay').innerHTML = "88%";
              document.getElementById('progressbarToDisplay').style.width = "88%";
              x.classList = "";
              x.classList.add("w3-container", "w3-center", "w3-aqua", "w3-margin", "w3-xxlarge");
            }

       else if (Total >= 92 && Total < 97){
           document.getElementById("displayImage").src = 'images/anakin 150.png';
              document.getElementById('progressbarToDisplay').innerHTML = "93%";
              document.getElementById('progressbarToDisplay').style.width = "93%";
              x.classList = "";
              x.classList.add("w3-container", "w3-center", "w3-indigo", "w3-margin", "w3-xxlarge");
            }

       else if (Total >= 96 && Total < 100){
           document.getElementById("displayImage").src = 'images/anakin 150.png';
              document.getElementById('progressbarToDisplay').innerHTML = "97%";
              document.getElementById('progressbarToDisplay').style.width = "97%";
              x.classList = "";
              x.classList.add("w3-container", "w3-center", "w3-lime", "w3-margin", "w3-xxlarge");
            }

        	else{
              document.getElementById("displayImage").src = 'images/yoda lightsaber 150.jpg';
              document.getElementById('progressbarToDisplay').innerHTML = "100%";
              document.getElementById('progressbarToDisplay').style.width = "100%";
              x.classList = "";
              x.classList.add("w3-container", "w3-center", "w3-green", "w3-margin", "w3-xxlarge");
            }

          }//end of function checkTotal

  //Reload page
  function myReloadFunction() {
			location.reload();
		}
