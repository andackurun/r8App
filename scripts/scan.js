(function (global) {
    	var scanned, comphash,
        buttonID, hashID, categoryName,
        app = global.app = global.app || {};
    
  //  document.addEventListener("deviceready", onDeviceReady, false);
//		document.getElementById("category").addEventListener("deviceready", categoryHidden, false);


        app.onDeviceReady = function() {
            document.getElementById("categoryButtons").style.visibility = "hidden";
            document.getElementById("category").style.visibility = "hidden";
            document.getElementById("comp_icon").style.visibility = "hidden";
            document.getElementById("comp_icon").src = "";
            //navigator.splashscreen.hide();
            var app = new App();
            app.run();
            
        };
    
    app.getCompHash = function() {
        return comphash;
        
    }
    
    app.setCategoryName = function(e) {
        
        var sender = (e && e.target) || (window.event && window.event.srcElement);
      	
        categoryName = sender.value;
    }
    
    app.getCategoryName = function() {
        
        return categoryName;
    }
    
    app.setButtonID = function(e) {
        
        var sender = (e && e.target) || (window.event && window.event.srcElement);
      	
        buttonID = sender.id;
    	//alert("Sender" + sender.id);
        
    };
    
    app.getButtonID = function() {
        return buttonID;
    };
    
    
        
        function App() {
        };
    
    function newfunction(e) {
        app.setCategoryName(e);
        app.setButtonID(e);
        
        app.questionsScreen();
    }
    
    function ajaxgetter(page,ach,acat,aeval){
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
		  
          document.getElementById("categoryButtons").style.visibility = "visible"
          document.getElementById("category").style.visibility = "visible"
          var obj = JSON.parse(data);
		  var newButton, newButton2;
          var buttonscontainer = document.getElementById("categoryButtons");
          
          
          for(var i=0; i<obj.length; i++) {
              //newButton2 = document.createElement("a");
              newButton = document.createElement("input");
              newButton.type = "button";
              newButton.value = obj[i].name;
              newButton.id = obj[i].id;
              newButton.setAttribute('class','orange');
              //newButton.setAttribute('data-role', 'button');
              //newButton.setAttribute('data-click', 'newFunction(e)')
              newButton.style.width = "200px";
              newButton.style.height = "35px";
              newButton.style.margin = "30px 0px 20px 0px";
              newButton.style.backgroundColor = "#00afff";
              newButton.style.border = "0";
              
              //newButton.href = '#tabstrip-weather'
              newButton.onclick = function(e) {
                  //navigator.notification.alert("clicked  "+ this.id, function() {}, "bravo", 'OK');
                  //app.setButtonID(newButton.id);
                  
                  app.setCategoryName(e);
                  app.setButtonID(e);
                  
                  app.questionsScreen();
                  window.location.hash="#tabstrip-login";
                  
              };
              var newRow = document.createElement("tr");
              var newCol = document.createElement("td");
              newCol.appendChild(newButton);
              newRow.appendChild(newCol);

              document.getElementById("tablecategory").appendChild(newRow);
              
             //buttonscontainer.appendChild(newButton);
              
          }
          
          //document.getElementById("text").innerHTML = data;
          
	  
	  }
	  else
          document.getElementById("categorytext").innerHTML = "hata olustu"
	//  $("#data").html("Error Dude!");
    });
  }
    
    App.prototype = {
        resultsField:null,
        isSignup: false,
        
        run: function() {
            var arr1;
            var buttonscontainer, newButton, qrResult,url, ch;
            var that = this;
            
            
           //that.resultsField = document.getElementById("result");
           //  ajaxgetter("http://www.r8app.com/categories.php", "b64b056a1e0f83fec93b59816df43a3d","","");
            
             cordova.plugins.barcodeScanner.scan(
                function(result) {
                    if (!result.cancelled) {
                        
                        //that.resultsField.innerHTML = result.format + " | " + result.text;
                        //that.isSignup.set("isSignup", true);
                        //window.location.href = "#tabstrip-login";
                        //document.getElementById("category").style.visibility='visible';
                        //that.qrResult = result.text;
						
                        url = "http://www.r8app.com/categories.php";
                        ch = result.text;
                        comphash = result.text;
                        //document.getElementById("compHash").innerHTML = result.text;
                        var icons = "http://www.r8app.com/company_icons/";
                        buttonscontainer = document.getElementById("tablecategory");
                        
                        //var abc = that.buttonscontainer.childElementCount + " " + that.buttonscontainer.children.item(0).id + " " +that.buttonscontainer.children.item(1).id  
                        //document.getElementById("categorytext").innerHTML = abc;
                        
                        
                        if(buttonscontainer.childElementCount > 2) {
                            var parent = buttonscontainer;
                            var children = parent.children;
                            for(var i=parent.childElementCount-1; i!=0; i--) {
                                parent.removeChild(children[i])
                            }
                            
                        }
						
						document.getElementById("comp_icon").src = icons + comphash+".jpg";
          			  document.getElementById("comp_icon").style.visibility = 'visible';
                        ajaxgetter(url,ch,"","");
                       	//that.arr1 = ["yemek", "servis", "fiyat"];
                       
                                                
                     /*   
                        for(var i=0; i<arr1.length;i++) {
                            $('<button>')
                            	.attr('id', arr1[i])
                            	.text(arr1[i])
                            	.appendTo('#buttons')
                            	.click(function(){
           							navigator.notification.alert("clicked"+ this.id, function() {}, "bravo", 'OK');
        						});
                        }
                        */
                    }
                    else {
                        window.location.hash = "#tabstrip-home2";
                    }
                }, 
                function(error) {
          			navigation.notification.alert("Tarama işlemi başarısız. Tekrar deneyiniz.", function() {window.location.href="#tabstrip-home2";}, "HATA", "OK");
                });
        }
        
    }
})(window);
    
/*     LoginViewModel = kendo.data.ObservableObject.extend({
         results: null,
         
         trueScan: function() {
             var that=this;
             
             results = document.getElementById("result");
             
             window.plugins.barcodeScanner.scan(
                function(result) {
                    if (!result.cancelled) {
                        results.innerHTML = result.format + " | " + result.text;    
                    }
                }, 
                function(error) {
                    console.log("Scanning failed: " + error);
                });
         }
         
         
        
         
     });
    
    app.scanService = {
        viewModel: new LoginViewModel()
    };
})(window);

*/
/*
document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {
    navigator.splashscreen.hide();
    var app = new App();
    app.run();
}

function App() {
}

App.prototype = {
    resultsField: null,
     
    run: function() {
        var that = this,
        scanButton = document.getElementById("scan");
        
        that.resultsField = document.getElementById("result");
        
        scanButton.addEventListener("click",
                                    function() { 
                                        that._scan.call(that); 
                                    });
    },
    
    _scan: function() {
        var that = this;
        if (device.uuid == "e0101010d38bde8e6740011221af335301010333" || device.uuid == "e0908060g38bde8e6740011221af335301010333") {
            alert("Not Supported in Simulator.");
        }
        else {
            window.plugins.barcodeScanner.scan(
                function(result) {
                    if (!result.cancelled) {
                        that._addMessageToLog(result.format + " | " + result.text);    
                    }
                }, 
                function(error) {
                    console.log("Scanning failed: " + error);
                });
        }
    },

    _addMessageToLog: function(message) {
        var that = this,
        currentMessage = that.resultsField.innerHTML;
        
        that.resultsField.innerHTML = currentMessage + message + '<br />'; 
    }
}*/