(function (global) {
    var LoginViewModel,
        arr1, valueResult, commentNo,
        questionID = [], sorusayisi,file2App,loginName,
        app = global.app = global.app || {};
var info = global.info;
    	
    	app.questionsScreen = function() {
			document.getElementById("commTextArea").value = "";
            var app = new App();
            app.run();
            
        };
        
        function App() {
        };
    
        app.getResult = function(e) {
            var str = e.name;
            var num = parseInt(str.charAt(15));
            valueResult[num-1] = e.value;
            //document.getElementById("deneme").innerHTML = num + " " + e.value;
            
            
            //document.getElementById("deneme").innerHTML = str.charAt(15) + " " + e.value;
        	
        }
    
        function notify() {
            
            //document.getElementById("deneme").innerHTML = valueResult.soru1;
        }
        
    
        app.sendResult = function() {
            var b = false;
            var res = true;
            var i;
			file2App = new File2App();
			file2App.run();
            for(i=1; i<=sorusayisi-1; i++) {
                b = false;
                for(var j=1; j<6; j++){
                    var s = "radio-choice-t-"                    
                    b = b || (document.getElementById(s + i+j).checked)                        
                }
                res = res && b;
            }
            if(!res) {
                        navigator.notification.alert("Cevaplar tamamlanmadı", function(){}, "HATA", 'OK')
                    }
            else {
            var rs = new Array();
			var devId = device.uuid;
            for (i=0; i<sorusayisi; i++) 
            {
               
                var arr = new Object();
				if(i==0) {
					file2App.readUserFile();
					arr.login =loginName;	
                }
				else {
					
                }
                
                arr.question_id = questionID[i];
                if(commentNo == i) {
					if(document.getElementById("commTextArea").value.trim() === "")
						continue;
					else {
						arr.eval = document.getElementById("commTextArea").value;
                    	arr.type = "1";	
                    }
                }
                else {
                    arr.eval = valueResult[i].toString();
                    arr.type = "0";
                
                }
                
                
                //document.getElementById("deneme").innerHTML = i
            	rs[i] = arr;
            }
            
            var pg = "http://www.r8app.com/insert.php";
            var ress = JSON.stringify(rs);

            //document.getElementById("deneme").innerHTML = ress;
            //var res = [{user_id:"2", question_id:"1", eval:"2", type:"0"}]
            resultSender(pg,"","",ress);
            
            }
        
        }
    
        function ajaxbetter(page,ach,acat,aeval){
        //page = e.data.page;
        $.get(page,{
          ch:ach,//ch:$("#ch").val(),
          cat:acat,//cat:$("#cat").val(),
          eval:aeval//eval:$("#eval").val()
        },function(data,status){
        //  alert($("#page").find(":selected").text() + "\nData: " + data + "\nStatus: " + status);
          if(status)
          {
        //  $("#data").html(data);
        //  var obj = JSON.parse(data);
        //  var str = JSON.stringify(obj, undefined, 2);
        //  $("#ex").html(obj[0].name);
          //print_r(obj);
	          document.getElementById("sorular").innerHTML = app.getCategoryName();
			  document.getElementById("sorular").style.textDecoration = "underline";
			  document.getElementById("sorular").style.fontWeight = "bold";
              var obj = JSON.parse(data);
              //document.getElementById("deneme").innerHTML = "database" + data;
              var newPar, text, qt, br;
              var allquestion = document.getElementById("allquestion");
              var commentText = document.getElementById("commentText");
              var i,j, parent, children;
              //var buttonscontainer = document.getElementById("questions");
              
              if(allquestion.childElementCount > 0) {
                  parent = allquestion;
                  children = parent.children;
                  for(i=parent.childElementCount-1; i>=0; i--) {
                      parent.removeChild(children[i])
                  }
                  
              }
              /*if(commentText.childElementCount > 0) {
                  parent = commentText;
                  children = parent.children;
                  for(i=parent.childElementCount-1; i>=0; i--) {
                      parent.removeChild(children[i])
                  }
              }*/
              //value = new Array(obj.length);
              
              //qt = document.getElementById("questionText");
              //qt.innerHTML = "";
             
              for(i=0; i<obj.length; i++) {
                  if(obj[i].type === "1") {
                      commentNo = i;
                      questionID[i] = obj[i].id;
                      
                  }
                  else {
                      qt = "question";
                      qt += i+1;
                      var d = "div"
                      d += i+1;
                      
                      var div = document.createElement("div");
                      div.setAttribute('id', d);
                      
                      var p = document.createElement("p");
                      p.setAttribute('id', qt);
                      
                      var newTxt = document.createTextNode(obj[i].text);
                      p.appendChild(newTxt);
                      //document.getElementById(qt).innerHTML = obj[i].text;
                      questionID[i] = obj[i].id;
                      div.appendChild(p);
                      
                      var form = document.createElement("form");
                      form.setAttribute("id", "radbut");
                      var field = document.createElement("fieldset");
                      field.setAttribute("data-role", "controlgroup");
                      field.setAttribute("data-type", "horizontal");
                      
                      var table = document.createElement("table");
                      //table.setAttribute("border", "1");
                      table.style.width = "100%";
                      var row = document.createElement("tr");
                      
                                      
                      
                      for(j=0; j<5; j++){
                          var col = document.createElement("td");
                          col.setAttribute("id", "column");
                          
                          var label = document.createElement("label");
                          var divinside = document.createElement("div");
                          var input = document.createElement("input");
                          divinside.setAttribute('id', "custom-label-" + (j+1));
                          var span = document.createElement("span");
                          span.setAttribute("class", (j+1).toString);
                          divinside.appendChild(span);
                          var r = "radio-choice-";
                          label.setAttribute('for',("radio-choice-t-" + (i+1) + (j+1)));
                          label.setAttribute('data-icon', (j+1));
                          label.appendChild(divinside);
                          input.setAttribute("type", "radio")
                          input.setAttribute("name", ("radio-choice-t-" + (i+1)));
                          input.setAttribute("id",("radio-choice-t-" + (i+1) + (j+1)));
                          input.setAttribute("value", (j+1));
                          input.setAttribute("data-theme", "c");
                          input.onclick = function() {
                              app.getResult(this);
                          }
                          col.appendChild(label);
                          col.appendChild(input);
                          
                          
                          row.appendChild(col);
                          
                      }
                      table.appendChild(row);
                      field.appendChild(table);
                      form.appendChild(field);
                      div.appendChild(form);
                      allquestion.appendChild(div);                  
                  }
                  //document.getElementById("div"+(i+1)).style.visibility = "visible";
                  
                  
              }
              sorusayisi = obj.length;
              valueResult = new Array();
              
              /*
              var p2 = document.createElement("p");
              p2.setAttribute('id', 'commQuestion');
              var commentTextValue = document.createTextNode(obj[commentNo].text); 
              p2.appendChild(commentTextValue);
              var commTxt = document.createElement("textarea");
              commTxt.setAttribute("style", "color:#000;");
              commTxt.setAttribute('id', 'commTextArea');
              commTxt.setAttribute('rows', '5');
              commTxt.setAttribute('cols', '40');
              commentText.appendChild(p2);
              commentText.appendChild(commTxt);*/   
             // document.getElementById("questionText").innerHTML = obj.length;
          
          }
          else
              document.getElementById("questionText").innerHTML = "hata olustu"
        //  $("#data").html("Error Dude!");
        });
      }
        function onConfirm(button) {
			if(button === 1) {
				window.location.hash = "#tabstrip-kayitol"
				// kayıt olma ekrani
            }
			else if(button === 2) {
				//daha sonra hatırlat butonu
				file2App.deleteFile(button);
            }
			else if(button === 3) {
				//ilgilenmiyorum butonu
				file2App.deleteFile(button);
			}
			
        }
	
        function resultSender(page,ach,acat,aeval){
        //page = e.data.page;
        $.get(page,{
          ch:ach,//ch:$("#ch").val(),
          cat:acat,//cat:$("#cat").val(),
          eval:aeval//eval:$("#eval").val()
        },function(data,status){
        //  alert($("#page").find(":selected").text() + "\nData: " + data + "\nStatus: " + status);
          if(status)
          {
			//navigator.notification.alert(data + device.uuid + aeval, function(){}, "durum", "ok");
			  file2App.readTextFromFile();
			  //document.getElementById("deneme").innerHTML += "aa " + info;
		/*	  if(info[0] === "0") {
				  var d= new Date();
				  var mm = d.getTime();
				  if(mm-parseInt(info[1]) <180000) {
					  navigator.notification.confirm("Cevaplarınız başarıyla kaydedildi", function() {window.location.hash ="#tabstrip-home3"}, "Durum", 'OK');
                  }
				  else {
					  navigator.notification.confirm("Cevaplarınız başarıyla kaydedildi. Sürpriz hediyelerden faydalanmak için kayıt olun.", onConfirm, "Durum", 'Kayıt ol, Daha Sonra Hatırlat, İlgilenmiyorum');
                  }
              }
			  else if(info[0] === "1") {
				  navigator.notification.confirm("Cevaplarınız başarıyla kaydedildi", function() { window.location.hash ="#tabstrip-home3"}, "Durum", 'OK');
              }
			  else if(info[0] === "2") {
				  navigator.notification.confirm("Cevaplarınız başarıyla kaydedildi", function() {window.location.hash ="#tabstrip-home3"}, "Durum", 'OK');
              }
          	*/	//document.getElementById("deneme").innerHTML = data; function(button) {document.getElementById("deneme").innerHTML= button; }
                          //document.getElementById("deneme").innerHTML = "basarılı"
          	//document.getElementById("deneme").innerHTML = "basarılı"
        //  $("#data").html(data);
        //  var obj = JSON.parse(data);
        //  var str = JSON.stringify(obj, undefined, 2);
        //  $("#ex").html(obj[0].name);
          //print_r(obj);
              //value = new Array(obj.length);
          
          }
          else
              navigator.notification.alert("Cevaplarınız kaydedilemedi. Tekrar deneyiniz.", function() {}, "HATA", 'OK')
        //  $("#data").html("Error Dude!");
        });
      }
    function setInfo(val) {
		info = val;
		//document.getElementById("deneme").innerHTML += "ab " + info;
		waitSuccess = 0;
    }
	
	function callWrite(button) {
		file2App.writeTextToFile("r8applogin", button);
    }
	
    App.prototype = {
		run: function() {
            var url, ch, catID;
            var that = this;
            sorusayisi = 0;
            
            that.url = "http://www.r8app.com/questions.php";
            that.ch = app.getCompHash();
                //document.getElementById("compHash").innerHTML;
			that.catID = app.getButtonID();
			
            //for(var i=1; i<4; i++) {
            //    document.getElementById("div" +i).style.visibility = "hidden";
            //}
            
            //document.getElementById("questionText").innerHTML = that.catID;
            
            //navigator.notification.alert("geldiii", function() {}, "olduuu", 'OK');
            
            
            ajaxbetter(that.url,that.ch, that.catID, "");
            
            //navigator.notification.alert(value, function(){}, "blabal", 'OK')
            
        },
		
        
        
            //for(var i=0; i<value.length; i++){
            //    document.getElementById("deneme").innerHTML += this.value[i];
                //document.getElementById("deneme").innerHTML += "\n"
            //}
            
        
    }
	
	function setAnonym() {
		loginName = "anonymous";
    };
	
	function setLoginName(email) {
		loginName = email;
    }
	
	function File2App() {
		
    };
	
	File2App.prototype = {
		fileSystemHelper: null,
	    fileNameField: null,
	    textField: null,
		buttonNum:null,
		
		run: function() {
			fileNameField = "r8applogin";
            fileSystemHelper = new FileSystemHelper();
        },
		deleteFile: function (button) {
			var that = this,
		    fileName = "r8applogin";
			buttonNum = button;
        
			fileSystemHelper.deleteFile(fileName, that._onDeleteSuccess, that._onDeleteError);
		},
		readTextFromFile: function() {
    		var that = this,
    		    fileName = "r8applogin";
            
    		fileSystemHelper.readTextFromFile(fileName, that._onSuccess, that._onError);
	    },
        writeTextToFile: function(fileName, button) {
    		var that = this;
        		
			var d = new Date();
			var mm = d.getTime();
			if(button === 2) {
				var tf = "0|" + mm;
            }
			else if(button === 3) {
				var tf = "2|" + mm;
            }
			text = tf;
            //document.getElementById("deneme").innerHTML += "file:" + fileName + " " + text;
            fileSystemHelper.writeLine(fileName, text, that._onSuccess2, that._onError2)
		
    	},
		readUserFile : function() {
			var that = this;
			var filename = "r8appuser";
			fileSystemHelper.readTextFromFile(filename, that._onUserFileSuccess, that._onUserFileError);
        },
        
        _onSuccess: function(value) {
			var info = value.split("|");
			//window.navigator.notification.confirm("Cevaplarınız başarıyla kaydedildi", function() {window.location.hash ="#tabstrip-home3"}, "Durum", 'OK');
			 if(info[0] === "0") {
				  var d= new Date();
				  var mm = d.getTime();
				  if(mm-parseInt(info[1]) <172800000) {
					  window.navigator.notification.confirm("Cevaplarınız başarıyla kaydedildi", function() {window.location.hash ="#tabstrip-home3"}, "Durum", 'OK');
                  }
				  else {
					  window.navigator.notification.confirm("Cevaplarınız başarıyla kaydedildi. Geri bildirim ve sürpriz hediyelerden faydalanmak için kayıt olun.", onConfirm, "Durum", 'Kayıt ol, Daha Sonra Hatırlat, İlgilenmiyorum');
                  }
              }
			  else if(info[0] === "1") {
				  window.navigator.notification.confirm("Cevaplarınız başarıyla kaydedildi", function() { window.location.hash ="#tabstrip-home3"}, "Durum", 'OK');
              }
			  else if(info[0] === "2") {
				  window.navigator.notification.confirm("Cevaplarınız başarıyla kaydedildi", function() {window.location.hash ="#tabstrip-home3"}, "Durum", 'OK');
              }
            //document.getElementById("dene").innerHTML += "basarili";
            //var information = value.split("|");
            //signin(information[0],information[1]);
            
    	},
        
    	_onError: function(error) {
            document.getElementById("deneme").innerHTML += "error";
    	},
        _onSuccess3: function(value) {
            //document.getElementById("dene").innerHTML = "basarili";
            var information = value.split("|");
            resend_confirmation(information[2]);
            
    	},
        
    	_onError3: function(error) {
            document.getElementById("dene").innerHTML = "basarısız";
            //window.location.hash = "#tabstrip-email";
    	},
        _onSuccess2: function(value) {
            //document.getElementById("deneme").innerHTML += "onsuccess2";
			window.location.hash ="#tabstrip-home3";
            //window.location.hash = "#tabstrip-home"
			            
    	},
        
    	_onError2: function(error) {
            document.getElementById("deneme").innerHTML += "error write";
            
    	},
		_onUserFileSuccess: function(value) {
			var information = value.split("|");
			setLoginName(information[0]);
            //document.getElementById("deneme").innerHTML += "onsuccess2";
            //window.location.hash = "#tabstrip-home"
			            
    	},
        
    	_onUserFileError: function(error) {
			setAnonym();
            //document.getElementById("deneme").innerHTML += "error write";
            
    	},
		_onDeleteSuccess: function(value){
			callWrite(buttonNum);
        },
		_onDeleteError : function(error) {
			
        }
		
    }
	
	
	
	
/*    arr1 = ["yemek", "servis", "fiyat"];
    buttonscontainer = document.getElementById("buttons");
    
    for(var i=0; i<arr1.length; i++) {
        newButton = document.createElement("input");
        newButton.type = "button";
        newButton.value = arr1[i];
        newButton.id = arr1[i];
        newButton.onclick = function() {
            navigator.notification.alert("clicked"+ this.id, function() {}, "bravo", 'OK');
            
        };
        
        buttonscontainer.appendChild(newButton);
        
    }
    
*/    
/*    LoginViewModel = kendo.data.ObservableObject.extend({
        isLoggedIn: false,
        username: "",
        password: "",

        

        
        onLogin: function () {
            var that = this,
                username = that.get("username").trim(),
                password = that.get("password").trim();

            if (username === "" || password === "") {
                navigator.notification.alert("Both fields are required!",
                    function () { }, "Login failed", 'OK');

                return;
            }

            that.set("isLoggedIn", true);
        },

        onLogout: function () {
            var that = this;

            that.clearForm();
            that.set("isLoggedIn", false);
        },

        clearForm: function () {
            var that = this;

            that.set("username", "");
            that.set("password", "");
        }
    });

    app.loginService = {
        viewModel: new LoginViewModel()
    };
*/

})(window);