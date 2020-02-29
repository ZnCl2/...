
//if nothing works check F12/console for debugging issues
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

//need to control button clicked logic
  
	  var lengthButtonClicked = false;
	  var BackCornerButtonClicked = false;
	  var DownWallButtonClicked = false;
	  var TheTeeButtonClicked = false;
	  var WatchBallButtonClicked = false;
	  var MakeOppRunButtonClicked = false;
	  var VolleyWhenPossButtonClicked = false;
	  var DelayWhenPossButtonClicked = false;
	  var ChangePaceButtonClicked = false;
	  var GoShortInitiativeButtonClicked = false;

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
	  var buttonBeingProcessed = this.id;
      var Total = 0;
	  					//if the button's already been clicked re-set it and the values
	  					if (determineIfCurrentButtonClicked((this.id))){						
							 document.getElementById(this.id).style.backgroundColor = "";
                             setTextToDisplay(this.id);
                             resetSkillValIfAlreadyClicked(this.id);
							}
	  					else{
                             setTextToDisplay(this.id);				
							//todo: change class list not element backgroundColor - need to find correct class?
                             document.getElementById(this.id).style.backgroundColor = "#886370";
				
                             setButtonVarVal(this.id);
                         }
                        Total = AddUpAllTheValues();
							//alert(Total);
	  					//this is the bar that grows horizontally across the page as the % value increases
                       setIndicator(Total);

            }//end of function Process
			
  function determineIfCurrentButtonClicked(){
				
				var currentBtn = arguments[0];
				
				//alert(currentBtn);
				
				if (currentBtn === "LengthBtn"){
					return lengthButtonClicked;
				} else if (currentBtn === "BackCornerBtn"){
					return BackCornerButtonClicked;
				}else if (currentBtn === "DownWallBtn"){
					return DownWallButtonClicked;
				}else if (currentBtn === "TBtn"){
					return TheTeeButtonClicked;
				}else if (currentBtn === "WatchBallBtn"){
					return WatchBallButtonClicked;
				}else if (currentBtn === "MakeOppRunBtn"){
					return MakeOppRunButtonClicked;
				}else if (currentBtn === "VolleyWhenPossBtn"){
					return VolleyWhenPossButtonClicked;
				}else if (currentBtn === "DelayWhenPossBtn"){
					return DelayWhenPossButtonClicked;
				}else if (currentBtn === "ChangePaceBtn"){
					return ChangePaceButtonClicked;
				}else if (currentBtn === "GoShortInitiativeBtn"){
					return GoShortInitiativeButtonClicked;
				} else 
				{return false};
			}

  //text to display in the dialoge box
  function setTextToDisplay(){

	  if(arguments[0] == 'LengthBtn'){
                              		textToDisplay.textContent = "A good length is your highest priority";							
                          }
                         else if(arguments[0] == 'BackCornerBtn'){
                              		textToDisplay.textContent = "Keep your opponent guessing";
                         }
                         else if(arguments[0] == 'DownWallBtn'){
                                    textToDisplay.textContent = "Keep the ball tight. Especially at front";
                         }
                         else if(arguments[0] == 'TBtn'){
                                    textToDisplay.textContent = "The T must be covered ... always";
                         }
                         else if(arguments[0] == 'WatchBallBtn'){
                                    textToDisplay.textContent = "Focus on the ball at all times";
                         }
                         else if(arguments[0] == 'MakeOppRunBtn'){
                                    textToDisplay.textContent = "Make your opponent run";
                         }
                         else if(arguments[0] == 'VolleyWhenPossBtn'){
                                    textToDisplay.textContent = "Use the volley when you can";
                         }
                         else if(arguments[0] == 'DelayWhenPossBtn'){
                                   textToDisplay.textContent = "Delay when you can";
                         }
                         else if(arguments[0] == 'ChangePaceBtn'){
                                    textToDisplay.textContent = "Pace change you can and should";
                         }
                         else if(arguments[0] == 'GoShortInitiativeBtn'){
                                    textToDisplay.textContent = "When the have the initiative, go short";
                         }
  }

   //set the global vars to reflect different accumulative values from the buttons
	//and set button that has been clicked bool to true
  function setButtonVarVal(theID){
	  
	 //alert(theID);

                         if(theID == 'LengthBtn'){
                           length = length + 24;
							lengthButtonClicked = true;
                          }
                         else if(theID == 'BackCornerBtn'){
                              BackCorner = BackCorner + 18;
							 BackCornerButtonClicked = true;

                         }

                         else if(theID == 'DownWallBtn'){
                                    DownWall = DownWall + 14;
									DownWallButtonClicked = true;
                         }
                         else if(theID == 'TBtn'){
                                    TheTee = TheTee + 11;
							 TheTeeButtonClicked = true;

                         }
                         else if(theID == 'WatchBallBtn'){
                                    WatchBall = WatchBall + 8;
							 WatchBallButtonClicked = true;

                         }
                         else if(theID == 'MakeOppRunBtn'){
                                    MakeOppRun = MakeOppRun + 7;
							 MakeOppRunButtonClicked = true;

                         }
                         else if(theID == 'VolleyWhenPossBtn'){
                                    VolleyWhenPoss = VolleyWhenPoss + 6;
							VolleyWhenPossButtonClicked = true;
                         }
                         else if(theID == 'DelayWhenPossBtn'){
                                    DelayWhenPoss = DelayWhenPoss + 5;
									DelayWhenPossButtonClicked = true;
                         }
                         else if(theID == 'ChangePaceBtn'){
                                    ChangePace = ChangePace + 4;
									ChangePaceButtonClicked = true;
                         }
                         else if(theID == 'GoShortInitiativeBtn'){
                                    GoShortInitiative = GoShortInitiative + 3;
									GoShortInitiativeButtonClicked = true;
                         }

  }//end of function setButtonVarVal

  //re-set value if user changes mind
//todo: add theID?
  function resetSkillValIfAlreadyClicked(){

    //alert(arguments[0]);

                         if(arguments[0] == 'LengthBtn'){
                          length = 0;
							 lengthButtonClicked = false;
                          }
                         else if(arguments[0] == 'BackCornerBtn'){
                                    BackCorner = 0;
							 BackCornerButtonClicked = false;
                         }
                         else if(arguments[0] == 'DownWallBtn'){
                                    DownWall = 0;
							 DownWallButtonClicked = false;
                         }
                         else if(arguments[0] == 'TBtn'){
                                    TheTee = 0;
							 TheTeeButtonClicked = false;
                         }
                         else if(arguments[0] == 'WatchBallBtn'){
                                    WatchBall = 0;
							  WatchBallButtonClicked = false;
                         }
                         else if(arguments[0] == 'MakeOppRunBtn'){
                                    MakeOppRun = 0;
							  MakeOppRunButtonClicked = false;
                         }
                         else if(arguments[0] == 'VolleyWhenPossBtn'){
                                    VolleyWhenPoss = 0;
							 VolleyWhenPossButtonClicked = false;
                         }
                         else if(arguments[0] == 'DelayWhenPossBtn'){
                                    DelayWhenPoss = 0;
							 DelayWhenPossButtonClicked = false;
                         }
                         else if(arguments[0] == 'ChangePaceBtn'){
                                    ChangePace = 0;
							 ChangePaceButtonClicked = false;
                         }
                         else if(arguments[0] == 'GoShortInitiativeBtn'){
                                    GoShortInitiative = 0;
							 GoShortInitiativeButtonClicked = false;
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
     //var x = document.getElementById("progressbarToDisplay");

    // alert(Total);
     //check if any of top three are 0 in which case indicator will show only '20%'
           if(length === 0 || BackCorner === 0 || DownWall === 0){
               document.getElementById('progressbarToDisplay').innerHTML = "20%";
               document.getElementById('progressbarToDisplay').style.width = "20%";
			   document.getElementById('progressbarToDisplay').style.backgroundColor = "#886370";
           	}else if (Total < 55 ){
              document.getElementById('progressbarToDisplay').innerHTML = "50%";
              document.getElementById('progressbarToDisplay').style.width = "50%";
            } else if (Total >= 55 && Total < 67){
              document.getElementById('progressbarToDisplay').innerHTML = "56%";
              document.getElementById('progressbarToDisplay').style.width = "56%";
            }else if (Total >= 66 && Total < 75){
              document.getElementById('progressbarToDisplay').innerHTML = "67%";
              document.getElementById('progressbarToDisplay').style.width = "67%";
            }else if (Total >= 74 && Total < 82){
              document.getElementById('progressbarToDisplay').innerHTML = "75%";
              document.getElementById('progressbarToDisplay').style.width = "75%";
            }else if (Total >= 81 && Total < 88){
              document.getElementById('progressbarToDisplay').innerHTML = "82%";
              document.getElementById('progressbarToDisplay').style.width = "82%";
            }else if (Total >= 87 && Total < 93){
              document.getElementById('progressbarToDisplay').innerHTML = "88%";
              document.getElementById('progressbarToDisplay').style.width = "88%";
            }else if (Total >= 92 && Total < 97){
              document.getElementById('progressbarToDisplay').innerHTML = "93%";
              document.getElementById('progressbarToDisplay').style.width = "93%";
            }else if (Total >= 96 && Total < 100){
              document.getElementById('progressbarToDisplay').innerHTML = "97%";
              document.getElementById('progressbarToDisplay').style.width = "97%";
            }else{
              document.getElementById('progressbarToDisplay').innerHTML = "100%";
              document.getElementById('progressbarToDisplay').style.width = "100%";
            }

          }//end of function setIndicator

  //Reload page
  function myReloadFunction() {
			location.reload();
		}
