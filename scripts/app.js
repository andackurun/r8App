(function (global) {
    var mobileSkin = "", email, login, password, data, validation, fileApp,companyName, c_id,comphash, lang, name, devId,
        app = global.app = global.app || {};

    
   // app.application = new kendo.mobile.Application();
    //app.application.showLoading($(document.body), {loading: "<h1>Please wait...</h1>"});

    document.addEventListener("deviceready", onDeviceReady, false);
    
    //document.addEventListener("touchstart", function() {}, false);

        //app.application = new kendo.mobile.Application($(document.body), {loading: "<h1>Please wait...</h1>"});
    app.setCompanyName = function(e) {
        
        var sender = (e && e.target) || (window.event && window.event.srcElement);
      	
        companyName = sender.value;
    }
    
    app.setCompanyID = function(e) {
        
        var sender = (e && e.target) || (window.event && window.event.srcElement);
      	
        c_id = sender.id;
    	//alert("Sender" + sender.id);
        
    }
    app.getCompanyName = function() {
        return companyName;
    }
	
		
	function isRegistered() {
		fileApp.readTextForDeviceId();
    }
	
	function registeredScreen(val) {
		document.getElementById("useremail").innerHTML = val[0];
		document.getElementById("username").innerHTML = val[1];
		window.location.hash = "#tabstrip-registeredUser";
    }
	
	function registerForScreen() {
		window.location.hash = "#tabstrip-kayitol";
    }
	
		
	function getfileApp() {
		return fileApp;
    }
    
    function onDeviceReady() {
        
       $(document.body).height(window.innerHeight);
       app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout" });
      
		$("input").focus(function(){
            $('footer').hide();
        });
        $("input").blur(function(){
            $('footer').show();
        });
        $("textarea").focus(function(){
            $('footer').hide();
        });
        $("textarea").blur(function(){
            $('footer').show();
        });
		
		$("#setting").click(function(){
			isRegistered();
        });
	
        //navigator.splashscreen.hide();
       /* 
        $(document).on('focus', 'input', function(e){
             $(".footer").addClass('fixfixed');
        })
        .on('blur', 'input', function(e) {
            $(".footer").removeClass('fixfixed');
        });*/
		
        fileApp = new FileApp();
        fileApp.run();
    }
    
    app.reset = function() {
        companyName = "";
        c_id ="";
    }
    
	function writeTextForDeviceId() {
		fileApp.writeTextForDeviceId();
    }
	
	function writeDeletedFile() {
		// after login screen write "1" to file
		var d = new Date();
		var mm = d.getTime();
		var text = "1|" + mm;
		var uye = "r8applogin";
		fileApp.writeTextToLoginFile(uye, text);
    }
	function writeFirstTimeToFile() {
		fileApp.writeTextToFile();
    }
    
	function yonlendir() {
		navigator.notification.alert("Onay mailiniz gönderilmiştir.", function(){window.location.hash = "#tabstrip-home2";}, "DURUM", "OK");
    }
    function FileApp() {
        
    }

    FileApp.prototype = {
        fileSystemHelper: null,
	    fileNameField: null,
	    textField: null,
		isFile:null,
        
        run: function(){
            var that = this;
			that.fileNameField = "r8applogin";
			that.textField = "0|0";
            fileSystemHelper = new FileSystemHelper();
            that.readTextFromFile.call(that);
			
			//document.getElementById("textdene").innerHTML += device.uuid;
        },
        
        readTextFromFile: function() {
    		var that = this,
    		fileName = "r8applogin";

    		fileSystemHelper.readTextFromFile(fileName, that._onSuccess, that._onError);
			//document.getElementById("textdene").innerHTML = "read file";
	    },
        writeTextToFile: function() {
			var that = this;
        	fileSystemHelper.writeLine("r8applogin","0|0", that._onSuccess, that._onError2);
    	},
		readTextForDeviceId: function() {
    		var that = this,
    		fileName = "r8appuser";

    		fileSystemHelper.readTextFromFile(fileName, that._onSuccessForDevice, that._onErrorForDevice);
			//document.getElementById("textdene").innerHTML = "read file";
	    },
		writeTextForDeviceId: function() {
			var that = this,
				devId = device.uuid;
        	fileSystemHelper.writeLine("r8appuser",devId, that._onSuccess, that._onError2);
    	},
		writeTextToLoginFile: function(filename,text) {
			var that = this;
        	fileSystemHelper.writeLine(filename,text, that._onSuccess2, that._onError2);
    	},
		writeUserInfoToFile: function(mail,aname) {
			var that = this;
			var filename = "r8appuser";
			var text = mail + "|" + aname;
        	fileSystemHelper.writeLine(filename,text, that._onSuccess, that._onUserInfoError);
    	},
        
        _onSuccess: function(value) {
			var that = this;
			//document.getElementById("textdene").innerHTML += "cc " + value;
			
            //var information = value.split("|");
            //signin(information[0],information[1]);
            
    	},        
    	_onError: function(error) {
			//document.getElementById("textdene").innerHTML += "basarısız";
            //window.location.hash = "#tabstrip-email";
			var that =this;
			writeFirstTimeToFile();

    	},
		_onUserInfoError: function(error) {
			navigator.notification.confirm("Kaydolma işlemi başarısız", function(button){if(button ===1){fileApp.writeUserInfoToFile(mail,name);}
																				else if(button ===2){yonlendir();}}, "HATA", "Tekrar Dene, Çık");
        },
        
        _onSuccess2: function(value) {
			var that = this;
            //document.getElementById("textdene").innerHTML += "onsuccess2";
			//that.isFile = "1";
            yonlendir();
            
    	},
        
    	_onError2: function(error) {
			var that = this;
            //document.getElementById("textdene").innerHTML = "error write";
            
    	},
		 _onSuccessForDevice: function(value) {
			var that = this;
			//document.getElementById("textdene").innerHTML += "cc " + value;
			var information = value.split("|");
			registeredScreen(information);
            //signin(information[0],information[1]);
            
    	},        
    	_onErrorForDevice: function(error) {
            //window.location.hash = "#tabstrip-email";
			var that =this;
			registerForScreen();
			

    	},
		deleteFile: function () {
			var that = this,
		    fileName = "r8applogin";
        
			fileSystemHelper.deleteFile(fileName, that._onDeleteSuccess, that._onDeleteError);
		},
		_onDeleteSuccess: function(value){
			writeDeletedFile();
			//document.getElementById("textdene").innerHTML = "delete";
        },
		_onDeleteError : function(error) {
			writeDeletedFile();
			//document.getElementById("textdene").innerHTML = "deleteerror";
        }
    }
    
    
     app.signup = function(alogin,aname,aemail){
    //page = e.data.page;
         $.get("http://www.r8app.com/signup.php",{
      login:alogin,//ch:$("#ch").val(),
      name:aname,//cat:$("#cat").val(),
	  email:aemail//eval:$("#eval").val()
    },function(data,status){
      //alert( "\nData: " + data + "\nStatus: " + status);
	  if(status)
	  {
		  fileApp.writeUserInfoToFile(aemail,aname);
		  fileApp.deleteFile();
		
	  }
        else {
            navigator.notification.alert("Kullanıcı kaydedilmedi", function(){}, "DURUM", "OK")
        }
	  
          //$("#data").html("Error Dude!");
    });
  };
    
    app.confirmation = function(alogin,avalidation){
    //page = e.data.page;
        $.get("http://wwww.r8app.com/confirmer.php",{
      email:alogin,//ch:$("#ch").val(),
      validation:avalidation,//cat:$("#cat").val(),
    },function(data,status){
      //alert( "\nData: " + data + "\nStatus: " + status);
	  if(status)
	  {
          if(data.indexOf("Success")!=-1) {
              window.location.hash = "#tabstrip-home2"
          }
          else {
            navigator.notification.alert("Onay kodu yanlış girildi", function(){}, "DURUM", "OK")
 
          }
 	  //$("#data").html(data);
	  //var obj = JSON.parse(data);
	  //var str = JSON.stringify(obj, undefined, 2);
	  //$("#ex").html(obj[0].name);
	  //print_r(obj);
	  
	  }
        else {
            navigator.notification.alert("Tekrar deneyiniz", function(){}, "DURUM", "OK")
        }
	  
          //$("#data").html("Error Dude!");
    });
  };
    
    function signin(alogin,apassword){
    //page = e.data.page;
    $.get("http://wwww.r8app.com/signin.php",{
      login:alogin,//ch:$("#ch").val(),
      password:apassword,//cat:$("#cat").val(),
	  //eval:aeval//eval:$("#eval").val()
    },function(data,status){
      //alert( "\nData: " + data + "\nStatus: " + status);
	  if(status)
	  {
	      if(data.indexOf("Success") != -1) {
              window.location.hash = "#tabstrip-home2"
          }
          else {
              if(data.indexOf("invalid") != -1) {
                  window.location.hash = "#tabstrip-home"
              }
              else{
                  window.location.hash = "#tabstrip-email"
              }
          }
	  //var obj = JSON.parse(data);
	  //var str = JSON.stringify(obj, undefined, 2);
	  //$("#ex").html(obj[0].name);
	  //print_r(obj);
	  
	  }
	  else {
          navigator.notification.alert("İnternet Bağlantısı Yok", function(){}, "HATA", "OK")    
      }
	  
    });
  };
    
    app.login = function() {
        email = document.getElementById("email").value;
        name = document.getElementById("name").value;
		if(email ==="" || name === "") {
			navigator.notification.alert("Boş alan bırakmayınız", function(){}, "HATA", 'OK');
        }
		else {
			//document.getElementById("dene").innerHTML=email+name+devId;
        	app.signup(email,name,email);
        }
		
        //password = document.getElementById("password").value;
        
        
        
    }
    
    app.confirm = function() {
        validation = document.getElementById("validate").value;
        app.confirmation(email,validation)
    }
    
    function companygetter(page){
    //page = e.data.page;
    $.get(page,{
    },function(data,status){
    //  alert($("#page").find(":selected").text() + "\nData: " + data + "\nStatus: " + status);
	  if(status)
	  {
	//  $("#data").html(data);
	//  var obj = JSON.parse(data);
	//  var str = JSON.stringify(obj, undefined, 2);
	//  $("#ex").html(obj[0].name);
	  //print_r(obj);
          //document.getElementById("categoryButtons").style.visibility = "visible"
          //document.getElementById("category").style.visibility = "visible"
          window.location.hash = "#tabstrip-companyList";
          var obj = JSON.parse(data);
		  var newButton;
          var buttonscontainer = document.getElementById("companyButtons");
          var comm = document.getElementById("companyList");
          
          
          for(var i=0; i<obj.length; i++) {
              newButton = document.createElement("input");
              newButton.type = "button";
              newButton.value = obj[i].c_name;
              newButton.id = obj[i].c_name;
              newButton.style.width = "200px";
              newButton.style.height = "35px";
              newButton.style.margin = "30px 0px 20px 0px";
              newButton.style.backgroundColor = "#0099FF";
              newButton.style.border ="0";
              
              //newButton.href = '#tabstrip-weather'
              newButton.onclick = function(e) {
                  //navigator.notification.alert("clicked  "+ this.id, function() {}, "bravo", 'OK');
                  //app.setButtonID(newButton.id);
                  
                  app.setCompanyName(e);
                  app.setCompanyID(e);
                  
                  app.commentSearch();
                  window.location.hash="#tabstrip-commentList";
                  
              };
              
              var newRow = document.createElement("tr");
              var newCol1 = document.createElement("td");
              newCol1.appendChild(newButton);
			  newRow.appendChild(newCol1);
              comm.appendChild(newRow);

              
          }
          
          //document.getElementById("text").innerHTML = data;
	  
	  }
	  else
          document.getElementById("compText").innerHTML = "hata olustu"
	//  $("#data").html("Error Dude!");
    });
  }
    
    
    app.companySearch = function() {
       var company = document.getElementById("companyName").value.trim();
		if(company === ""){
			navigator.notification.alert("Firma Adı Giriniz", function(){}, "HATA", "OK");	
        }
       else {
	    	document.getElementById("companyName").value = "";
			var page = "http://www.r8app.com/comments.php?companylike=";
			page += company;
			var comm = document.getElementById("companyList");
			if(comm.childElementCount > 0) {
				var parent = comm;
				var children = parent.children;

				for(var i=parent.childElementCount; i!=0; i--) {

					document.getElementById("companyList").deleteRow();
				}

			}
			companygetter(page);   
       }
	}
    
    function commentGetter(page){
    //page = e.data.page;
    $.get(page,{
    },function(data,status){
    //  alert($("#page").find(":selected").text() + "\nData: " + data + "\nStatus: " + status);
	  if(status)
	  {
          var comm = document.getElementById("averages");
	      var obj = JSON.parse(data);
          //var comm = document.getElementById("averages");
          
          document.getElementById("comp_icon_td").style.border = "none";
          
          var newRow1= document.createElement("tr");
          var newCol = document.createElement("td");
          var newTxt = document.createTextNode(companyName);
          newCol.style.width = "100%";
          newCol.style.textAlign ="center";
          newCol.setAttribute('colspan', '2');
          newCol.appendChild(newTxt);
          newRow1.appendChild(newCol);
          comm.appendChild(newRow1);
          comphash = obj[0].hash
          var icons = "http://www.r8app.com/company_icons/";
          document.getElementById("comp_icon_comment").src = icons + comphash+".jpg";
          document.getElementById("comp_icon_comment").style.visibility = 'visible';
          for(var i=0; i<obj.length; i++) {
			  if(obj[i].type ==="1")
			  	continue;
              var newRow = document.createElement("tr");
              var newCol1 = document.createElement("td");
              var newCol2 = document.createElement("td");
              newCol1.style.width = "50%";
              newCol2.style.width = "50%";
              var newTxt1 = document.createTextNode(obj[i].name);
              var num = parseFloat(obj[i].average).toFixed(2);
              var newTxt2 = document.createTextNode(num+" / 5.00");
              newCol1.appendChild(newTxt1);
              newCol2.appendChild(newTxt2);
              newRow.appendChild(newCol1);
              newRow.appendChild(newCol2);
              
              comm.appendChild(newRow);
              
          }
		  var commentTable = document.getElementById("commText");
		  for(var j=0; j<obj.length; j++) {
			if(obj[j].type === "1") {
				var newcol = document.createElement("div");
				newcol.setAttribute("class", "callout top-left");
				var newtxt = document.createTextNode(obj[j].eval);
				newcol.appendChild(newtxt);
				commentTable.appendChild(newcol);
			}
			 
          }
		  	  
		  
	  }
	  else
          document.getElementById("commText").innerHTML = "hata olustu"
	//  $("#data").html("Error Dude!");
    });
  }
    
    app.commentSearch = function() {
		$(window).scroll(function(){
		document.getElementById("height").innerHTML = $(window).scrollTop();
			
        });
        var company = companyName;
        var page = "http://www.r8app.com/comments.php?company=";
        page += company;
        var comm = document.getElementById("averages");
		var commText =document.getElementById("commText");
        document.getElementById("comp_icon_comment").style.visibility = 'hidden';
          if(comm.childElementCount > 0) {
              var parent = comm;
              var children = parent.children;
                
                for(var i=parent.childElementCount; i!=1; i--) {
                   
                     document.getElementById("averages").deleteRow(1);
                }
                
           }
		if(commText.childElementCount > 0) {
			commText.innerHTML = "";
        }
        commentGetter(page);
        
        
    }
    
    
    function resend_confirmation(aemail){
        //page = e.data.page;
        $.get("http://www.r8app.com/confirmer.php",{
          email:aemail,//ch:$("#ch").val(),
    	  //email:aemail//eval:$("#eval").val()
    	  resend:true//eval:$("#eval").val()
        },function(data,status){
          //alert( "\nData: " + data + "\nStatus: " + status);
    	  if(status)
    	  {
              navigator.notification.alert("DURUM", function() {}, "Yeni Onay Kodunuz Gönderildi", 'OK');
    	  //$("#data").html(data);
    	  //var obj = JSON.parse(data);
    	  //var str = JSON.stringify(obj, undefined, 2);
    	  //$("#ex").html(obj[0].name);
    	  //print_r(obj);
    	  
    	  }
    	  else{
              
          }
    	  //$("#data").html("Error Dude!");
        });
      }
    
      app.resend = function() {
          fileApp.readTextFromFileforCompany();
          
          
      }
    

})(window);