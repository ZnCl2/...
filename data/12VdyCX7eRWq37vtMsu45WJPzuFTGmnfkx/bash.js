/*jslint browser:true*/

var Bash = function (selector, options) {
  var cmds = ['ls','cd','sudo','apt-get','help','about','youtube','yt','facebook','fb','instagram','ig','twitter','tw','google+','g+'];
  var guestdir = ['videos','pictures'];
  var homedir = ['zrnt','ben'];
  var rootdir = ['bin','boot','dev','etc','home','lib','lost+found','misc','mnt','net','opt','proc','root','sbin','tmp','usr','var'];

  var directoryTree = [
    {
      name: "/",
      sub: [
      {name: "bin", type: "fo"},
      {name: "boot", type: "fo"},
      {name: "dev", type: "fo"},
      {name: "etc", type: "fo"},
      {
        name: "home",
        type: "fo",
        sub: [
          {name: "ben", type: "fo"},
          {
            name: "zrnt",
            type: "fo",
            sub: [
              {
                name: "videos",
                type: "fo",
                sub: [
                  {
                    name: "playlists",
                    type: "la",
                    run: function(delay){
                      var url = 'https://www.youtube.com/user/Uploadthedownload/playlists';
                      self.post('--------------------------------------', 0, false, true);
                      self.post('UtD Playlists', 0, false, true);
                      self.post('--------------------------------------', 0, false, true);
                      self.post('Load ('+url+')', 200, false, true);
                      self.post('Found yt_plylist', 360, false, true);
                      self.post('Found ytrp_wrapper', 460, false, true);
                      self.post('Connection established.', 600, false, true);
                      self.post('Launching...', 900, false, true);
                      self.post('', delay, false, true, function() {
                        window.open(url);
                      });
                    }
                  },{
                    name: "popular",
                    type: "la",
                    run: function(delay){
                      var url = 'https://www.youtube.com/user/Uploadthedownload/videos?view=0&sort=p&flow=grid';
                      self.post('--------------------------------------', 0, false, true);
                      self.post('UtD Popular Videos', 0, false, true);
                      self.post('--------------------------------------', 0, false, true);
                      self.post('Load ('+url+')', 200, false, true);
                      self.post('Found yt_videos', 360, false, true);
                      self.post('Found ytrp_wrapper', 460, false, true);
                      self.post('Connection established.', 600, false, true);
                      self.post('Launching...', 900, false, true);
                      self.post('', delay, false, true, function() {
                        window.open(url);
                      });
                    }
                  }
                ]
              },{
                  name: "pictures", 
                  type: "fo",
                sub: [
                  {
                    name: "instagram",
                    type: "la",
                    run: function(delay){
                      var url = 'https://www.instagram.com/uploadthedownload/';
                      self.post('--------------------------------------', 0, false, true);
                      self.post('UtD Instagram', 0, false, true);
                      self.post('--------------------------------------', 0, false, true);
                      self.post('Load ('+url+')', 200, false, true);
                      self.post('Found ig_loader', 360, false, true);
                      self.post('Found og_wrapper', 460, false, true);
                      self.post('Connection established.', 600, false, true);
                      self.post('Launching...', 900, false, true);
                      self.post('', delay, false, true, function() {
                        window.open(url);
                      });
                    }
                  }
            ]
              }
            ]
          }
        ]
      },
      {name: "lib", type: "fo"},
      {name: "lost+found", type: "fo"},
      {name: "misc", type: "fo"},
      {name: "mnt", type: "fo"},
      {name: "net", type: "fo"},
      {name: "opt", type: "fo"},
      {name: "proc", type: "fo"},
      {name: "root", type: "fo"},
      {name: "sbin", type: "fo"},
      {name: "tmp", type: "foh"},
      {name: "usr", type: "fo"},
      {name: "var", type: "fo"},
    ]
  }
];

  var currentPosition = "/home/zrnt";

  function directory(){
    var steps = currentPosition.split('/');
    var count = 1;
    var obj = [];
    if(steps[1] == "" || steps[1] == undefined){
      obj = directoryTree[0].sub;
    } else {
      obj = subdirectories(directoryTree[0].sub,steps,count);
    }
    return obj;
  }

  function inDirectory(str,returnint){
    var test = false;
    var arr = directory();
    for(index = arr.length - 1; index >= 0; --index){
      if(str == arr[index].name){
        test = true;
        if(returnint !== undefined){test = index;}
      }
    }
    return test;
  }

  function subdirectories(arr,steps,count){
    var obj = [];
    for(index = arr.length - 1; index >= 0; --index){
      if(arr[index].name == steps[count]){
        if(count==steps.length-1){
          obj = arr[index].sub;
        }else{
          count = count + 1;
          obj = subdirectories(arr[index].sub,steps,count);
        }
      }
    }
    return obj;
  }
    
    function setEnd(contentEditableElement){
        //Thanks Nico Burns
        var range,selection;
        if(document.createRange){ //Firefox, Chrome, Opera, Safari, IE 9+
            range = document.createRange();//Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection();//get the selection object (allows you to change selection)
            selection.removeAllRanges();//remove any selections already made
            selection.addRange(range);//make the range you have just created the visible selection
        } else if(document.selection){ //IE 8 and lower
            range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
            range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            range.select();//Select the range (make it the visible selection
        }
    }

    'use strict';

        // Selectors
    var command = selector.querySelector('.command'),
        terminal = selector.querySelector('.terminal'),

        // Options
        computer = options.computer || 'ttys000',
        help = options.help || undefined,
        prompt = options.prompt || 'user@home:~$',
        name = options.name || undefined,
        func = options.function || undefined,
        demo = options.demo || false,

        // Variables
        history = [],
        current = history.length,
        self = this;

    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^[\s\xA0]+|[\s\xA0]+$/g, '');
        };
    }

    this.time = function () {
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            now = new Date(),
            day = days[now.getDay()],
            month = months[now.getMonth()],
            date = now.getDate(),
            hours = (now.getHours() < 10 ? '0' : '') + now.getHours(),
            minutes = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes(),
            seconds = (now.getSeconds() < 10 ? '0' : '') + now.getSeconds();
        return day + ' ' + month + ' ' + date + ' ' + hours + ':' + minutes + ':' + seconds;
    };

    this.createPrompt = function (string, index) {
        var symbol = document.createElement('span');
        symbol.className = 'prompt prompt-' + index;
        symbol.innerHTML = string.trim() + ' ';
        return symbol;
    };

    this.addPrompts = function (element) {
        var i;
        if (typeof prompt === 'string') {
            element.appendChild(self.createPrompt(prompt), 0);
        } else {
            for (i = 0; i < prompt.length; i += 1) {
                element.appendChild(self.createPrompt(prompt[i], i));
            }
        }
    };

    this.reset = function () {
        var header = document.createElement('div'),
            input = document.createElement('span');
        self.addPrompts(header);
        header.id = 'row';
        input.className = 'command';
        input.id = 'command';
        input.contentEditable = true;
        input.spellcheck = false;
        input.setAttribute("autocomplete","off");
        input.setAttribute("autocapitalize","off");
        input.setAttribute("autocorrect","off");
        header.appendChild(input);
        terminal.appendChild(header);
        terminal.scrollTop = terminal.scrollHeight;
        command = selector.querySelector('.command');
        command.focus();
    };

    this.post = function (message, delay, symbol, feedback, next) {
        var output;
        setTimeout(function () {
            output = document.createElement('p');
            if (feedback) {
                output.className = 'feedback';
            }
            if (demo && symbol) {
                self.addPrompts(output);
            }
            output.innerHTML = output.innerHTML + ' ' + message;
            terminal.appendChild(output);
            terminal.scrollTop = terminal.scrollHeight;
            if (next) {
                return next();
            }
        }, delay);
    };

    self.clear = function (next) {
        terminal.innerHTML = "";
        return next() || true;
    };

    this.start = function () {
      if (help) {
          self.post(help, 150, false, true);
      }
        self.post('Last login: ' + this.time() + ' on ' + computer, 300, false, true, function () {
            setTimeout(function () {
                self.reset();
            }, 300);
        });
    };


    terminal.addEventListener('click', function (e) {
      terminal.scrollTop = terminal.scrollHeight;
      command.focus()
    });

    terminal.addEventListener('keydown', function (e) {
        var key = e.keyCode,
            request,
            message;
        if(e.keyCode == 9) {
            e.preventDefault();
            var cmd = command.innerText;
            directory().forEach(function(entry) {
                var item = entry.name;
                var leng = 0;
                var type = "fo";
                if((cmd.indexOf('cd') !== -1) || (cmd.indexOf('ls') !== -1)){
                    leng = 3;
                } else if(cmd.indexOf('./') !== -1){
                    leng = 2;
                    type="la";
                }
                var input = cmd.substring(leng);
                if(leng !== 0 && input.length > 0){
                    if(entry.type == type){
                        if(item.substring(0,input.length).indexOf(input) !== -1){
                            command.innerText = cmd.substring(0,leng)+entry.name;
                            setEnd(command);
                        }
                    }
                }
            });
        }
        if (key === 13) {
            e.preventDefault();
            command.removeAttribute('contenteditable');
            request = command.innerHTML.trim();
            command.removeAttribute('class');
            command.removeAttribute('id');

            //BREAK DOWN THE REQUEST
            var rqs = request.trim();
            var cmd = rqs.toLowerCase().split(" ")[0].trim();
            var qry = rqs.split(" ")[1];
            var scmd = rqs.toLowerCase().substring(0,2);
            var delay = 0;

            if(qry !== undefined){qry = qry.trim();}

            if (request === "") {
                self.reset();

                //DOES THE COMMAND EXIST?
              //---------------------------------------------
            } else if(scmd=="./"){
              var sqry = rqs.substring(2,rqs.length);
              var launch = directory()[inDirectory(sqry,true)];
              console.log(launch);
              if(launch!==-1){
                if(launch !== undefined){
                  if(launch.type == "fi" || launch.type == "la"){
                    if(launch.type == "la"){
                      delay = 1000;
                      launch.run(delay);
                    } else {
                      window.open(currentPosition.substring(1,currentPosition.length) + "/" + sqry);
                    }
                  } else {
                    self.post('-bash: ' + sqry + ': Cannot launch directory', 0, false, true);
                  }
                } else {
                  self.post('-bash: ' + sqry + ': Specified file does not exist', 0, false, true);
                }
              }

              //END CUSTOM COMMANDS
              self.post('', delay + 10, false, true, function() {
                  self.reset();
                  history.push(request);
                  current = history.length;
              });
            } else if (cmds.indexOf(cmd)!==-1) {
              //---------------------------------------------
              if(cmd=="youtube"||cmd=="yt"){window.open("http://youtube.com/uploadthedownload");}
              if(cmd=="facebook"||cmd=="fb"){window.open("http://facebook.com/uploadthedownload");}
              if(cmd=="google+"||cmd=="g+"){window.open("http://plus.google.com/+uploadthedownload");}
              if(cmd=="instagram"||cmd=="ig"){window.open("http://instagram.com/uploadthedownload");}
              if(cmd=="twitter"||cmd=="tw"){window.open("http://twitter.com/uploadtd");}

              if(cmd=="about"){
                self.post('--------------------------------------', 0, false, true);
                delay = 100;
                self.post("Coded by <a target='_blank' href='https://benjaminnelan.com.au'>Benjamin Nelan</a> in 2016.", delay, false, true);
                delay = 200;
                self.post("Based on Hayden Bleasel's '<a target='_blank' href='https://github.com/haydenbleasel/bash'>bash.js</a>'", delay, false, true);
                delay = 400;
                // self.post("Check out my fork of Hayden's project here: ", delay, false, true);
                self.post('--------------------------------------', delay, false, true);
              }

              if(cmd=="help"){
                delay = 10;
                self.post("<span class='color-green'>// These commands can be used on this system:</span><br>", delay, false, true);
                self.post("<span class='color-light-blue'>cd [dir]</span> - Change the shell working directory. eg. 'cd videos'", delay, false, true);
                self.post("<span class='color-light-blue'>ls</span> - Display files and folders in working directory<br><br>", delay, false, true);
              }

              if(cmd=="sudo"){
                delay = 30;
                self.post("Sorry, user zrnt may not run sudo on uploadthedownload.bit", delay, false, true);
              }

              if(cmd=="apt-get"){
                delay = 2000;
                self.post("E: Could not open lock file /var/lib/apt/lists/lock - open (13: Permission denied)", delay, false, true);
                self.post("E: Unable to lock directory /var/lib/apt/lists/", delay, false, true);
                self.post("E: Could not open lock file /var/lib/dpkg/lock - open (13: Permission denied)", delay, false, true);
                self.post("E: Unable to lock the administration directory (/var/lib/dpkg/), are you root?", delay, false, true);
              }

              if(cmd=="ls"){
                var temp = "";
                directory().forEach(function(entry) {
                  var spn = "<span class='color-blue'>";
                  if(entry.type !== undefined){
                    switch(entry.type){
                      case "foh":
                      spn = "<span class='color-highlight-green'>";
                      break;
                      case "fi":
                      spn = "<span class='color-green'>";
                      break;
                      case "la":
                      spn = "<span class='color-red'>";
                      break;
                    }
                  }
                    temp = temp+" "+spn+entry.name+"</span>";
                });
                self.post(temp, 0, false, true);
              }

              if(cmd=="cd" && qry!==undefined && qry!==""){
                if(qry==".."){
                    currentPosition = currentPosition.substring(0,currentPosition.lastIndexOf('/'));
                    if(currentPosition == ""){
                      currentPosition = "/";
                    }
                } else if(inDirectory(qry)){
                  console.log(currentPosition);
                  if(directory()[inDirectory(qry,true)].sub !== undefined){
                    if(currentPosition == "/"){
                      currentPosition += qry;
                    } else {
                      currentPosition += "/"+qry;
                    }
                  } else {
                    if(directory()[inDirectory(qry,true)].type == "fi"){
                      self.post('-bash: cd: ' + qry + ': Not a directory', 0, false, true);
                    }else{
                      self.post('-bash: cd: ' + qry + ': Permission denied', 0, false, true);
                    }
                  }
                } else {
                  self.post('-bash: ' + qry + ': No such file or directory', 0, false, true);
                }
              }

              //END CUSTOM COMMANDS
              self.post('', delay + 10, false, true, function() {
                  self.reset();
                  history.push(request);
                  current = history.length;
              });
              //---------------------------------------------
            } else if (request === 'clear') {
                self.clear(function () {
                    self.reset();
                });
            } else if (request.split(' ')[0] === 'echo') {
                message = request.split(' ').splice(1).join(' ');
                self.post(message === '' ? '&nbsp;' : message, 0, false, true, function () {
                    self.reset();
                    history.push(request);
                    current = history.length;
                });
            } else {
                self.post('-bash: ' + request.split(' ')[0] + ': command not found', 0, false, true, function () {
                    self.reset();
                    history.push(request);
                    current = history.length;
                });
            }
        } else if (key === 38 && current > 0) {
            current -= 1;
            command.innerHTML = history[current];
            setEnd(command);
        } else if (key === 40 && current < history.length - 1) {
            current += 1;
            command.innerHTML = history[current];
            setEnd(command);
        }
    });

    this.initialise = function () {
        if (demo && func) {
            func(self, function () {
                return true;
            });
        } else {
            self.start();
        }
    };

    this.initialise();

};
