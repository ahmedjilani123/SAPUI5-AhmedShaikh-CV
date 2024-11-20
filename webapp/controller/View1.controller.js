sap.ui.define([
    "./BaseController",
    'sap/ui/core/Fragment',
    "sap/m/MessageBox"
], (BaseController,Fragment,MessageBox) => {
    "use strict";

    return BaseController.extend("ascv.sap.portfolio.controller.View1", {
        onInit() {
          
         },
        onAfterRendering: function () {
            let oModel = this.getView().getModel("viewModel"),theme;
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                theme="sap_horizon_dark";
                oModel.setProperty("/isDarkMode", true);
            } else {
                theme ="sap_horizon";
                oModel.setProperty("/isDarkMode", false); 
            }
            sap.ui.getCore().applyTheme(theme);
            this.MessageStripCloseAction()
        },
        SWitchThemePress: function (data) {
            var DesignModel = data.getParameter("state") ? "sap_horizon_dark" : "sap_horizon";
            localStorage.setItem("theme", data.getParameter("state"));
            sap.ui.getCore().applyTheme(DesignModel);
            var oModel = this.getView().getModel("viewModel");
            oModel.setProperty("/isDarkMode", data.getParameter("state"));
        },
        HandleCloseFeedBackPress:function(oEvent){
            
             this.Dialog = new sap.ui.xmlfragment("ascv.sap.portfolio.Fragments.FeedBack",this);
             this.getView().addDependent(this.Dialog);
             this.Dialog.open();
            
        },
        CancelFeedbackDialogPress:function(oEvent){
            oEvent.getSource().getParent().close();
        },
        SubmitDataFeedbackToYouPress:function(oEvent){
            debugger
            var that =this;
            var InfoData = this.getOwnerComponent().getModel("FeedbackModel").getData();
            var InputSource =oEvent.getSource().getParent().getContent()[0].getContent();
            const Validate =this.ValidatedData(InfoData,InputSource);
            if(Validate){
            var pa={
                // addressLine1:InfoData.FeedBack,
                password:InfoData.Name,
                username:InfoData.Email
            }
                $.ajax({
                    url:"https://api.freeapi.app/api/v1/users/login",
                    method:"POST",
                    data:JSON.stringify(pa),
                    dataType:"json",
                    contentType:"application/json",
                    success:function(data){
                        debugger;
                        that.getOnwerComponent().getModel("FeedbackModel").setData({});
                        that.getOnwerComponent().getModel("FeedbackModel").refresh(true);
                        sap.m.MessageToast.show("Successfully Submitted Data");
                        oEvent.getSource().getParent().close();
                    },
                    error:function(xhr, status, err){
                        debugger
                        sap.m.MessageToast.show("Error");
                        oEvent.getSource().getParent().close();
                    }
                })
            }
            
        }
      
    });
});