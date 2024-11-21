sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/Device",
    "sap/m/library"
  ], (Controller,Device,MLibrary) => {
    "use strict";
  
    return Controller.extend("ascv.sap.portfolio.controller.BaseController", {
        TaskDetailPress:function(data){
            
            var iPagesCount = 1;
			if (Device.system.desktop) {
				iPagesCount = 3;
			} else if (Device.system.tablet) {
				iPagesCount = 1;
			}
            var TaskObject =data.getSource().getBindingContext("TaskModel").getObject();
         
            if ("Title" in TaskObject) {
                var omodel = this.getOwnerComponent().getModel("sideTaskModel");
                omodel.setData(TaskObject);
                omodel.refresh(true);
            } else {
                console.error("TaskDetail element not found!");
            }
            var model = this.getOwnerComponent().getModel("ColumnLayout");
            model.setData({FLayout:"TwoColumnsBeginExpanded"})
            model.refresh(true);
            this.CarouselFunctionModel(iPagesCount);
        },
        OpenAppPress:function(data){
            debugger
            var TaskObject =data.getSource().getBindingContext("TaskModel").getObject();
            MLibrary.URLHelper.redirect(TaskObject.Url, true);
                  
        },
        handleCloseSideScreenPre:function(data){
            var iPagesCount = 1;
			if (Device.system.desktop) {
				iPagesCount = 4;
			} else if (Device.system.tablet) {
				iPagesCount = 3;
			}
            var model = this.getOwnerComponent().getModel("ColumnLayout");
            model.setData({FLayout:"OneColumn"})
            model.refresh(true);
            this.CarouselFunctionModel(iPagesCount);
        },
        CarouselFunctionModel:function(data){
            var CarouselModel = this.getOwnerComponent().getModel("CarouselModel");
            CarouselModel.setData({CountPage:data});
            CarouselModel.refresh(true);
        },
        MessageStripCloseAction:function(){
            var that =this;
            setTimeout(function() {
                var messageStrip = that.getView().byId("MessageStripID");
                if (messageStrip) {
                    messageStrip.close();
                }
            }, 5000);
        },
        handleLinkObjectAttributePress : function (oEvent) {
            MLibrary.URLHelper.redirect(oEvent.getSource().getProperty("text"), true);
		},
        formatState: function(state) {
            if (state === "Complete") {
                return "Success";
            } else if (state === "In Progress") {
                return "Warning"; 
            } else {
                return "Error"; 
            }
        },
        ValidatedData:function(data,InputSource){
            let CheckEmail=true,Error={bool:true};
            var Arr=["Name","Email","FeedBack"]; //Check value
            for(var i=0; i<Arr.length; i++){
                InputSource[i].setValueState("None");
                if (data.hasOwnProperty(Arr[i])) {  
                    if (data[Arr[i]].trim() == "") { 
                        Error ={ field: Arr[i],bool:false,InpNum:i}; 
                        break;
                    }
                }else{
                    Error ={ field: Arr[i],bool:false,InpNum:i}; 
                    break;
                }
            }
            if(!Error.bool){
                InputSource[Error.InpNum].setValueState("Error"); 
                InputSource[Error.InpNum].setValueStateText(`${Error.field} field must be required`);
                   return false
               }
               var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
               if (emailPattern.test(data.Email)) {
                return true
               }else{
                InputSource[1].setValueState("Error");
                InputSource[1].setValueStateText("Email must be valid");
                return false;
               }
            
        },
        OpenLinkbuttonPress:function(data){
            debugger
            var sText =data.getSource().getFieldGroupIds(); 
            switch (sText[0]) {
                case "LinkedIn":
                    MLibrary.URLHelper.redirect("https://www.linkedin.com/in/ahmed-jilani-profile", true);
                    break;
                case "GitHub":
                    MLibrary.URLHelper.redirect("https://github.com/ahmedjilani123?tab=repositories", true);
                    break;
                default:
                    return;
            }
        }
    });
  });