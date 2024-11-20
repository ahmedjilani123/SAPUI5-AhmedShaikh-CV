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
            }, 9000);
        },
        handleLinkObjectAttributePress : function (oEvent) {
            MLibrary.URLHelper.redirect(oEvent.getSource().getProperty("text"), true);
		}
    });
  });