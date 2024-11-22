sap.ui.define([
    "./BaseController",
    'sap/ui/core/Fragment',
    "sap/m/MessageBox",
    'sap/ui/core/BusyIndicator'
], (BaseController,Fragment,MessageBox,BusyIndicator) => {
    "use strict";

    return BaseController.extend("ascv.sap.portfolio.controller.View1", {
        onInit() { 
            BusyIndicator.hide() 
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
            this.getExperience("2023-04-1")
        },
        SWitchThemePress: function (data) {
            var DesignModel = data.getParameter("state") ? "sap_horizon_dark" : "sap_horizon";
            localStorage.setItem("theme", data.getParameter("state"));
            sap.ui.getCore().applyTheme(DesignModel);
            var oModel = this.getView().getModel("viewModel");
            oModel.setProperty("/isDarkMode", data.getParameter("state"));
        },
        HandleCloseFeedBackPress:function(oEvent){
            
            //  this.Dialog = new sap.ui.xmlfragment("ascv.sap.portfolio.Fragments.FeedBack",this);
            //  this.getView().addDependent(this.Dialog);
            //  this.Dialog.open();
            
        },
        CancelFeedbackDialogPress:function(oEvent){
            oEvent.getSource().getParent().close();
        },
        SubmitDataFeedbackToYouPress:async function(oEvent){
            
            var that =this;
            var InfoData = this.getOwnerComponent().getModel("FeedbackModel").getData();
            var InputSource =oEvent.getSource().getParent().getContent()[0].getContent();
            const Validate =this.ValidatedData(InfoData,InputSource);
            if(Validate){
            var pa={ 
                "senderEmail":InfoData.Email,
                 "senderFeedback":InfoData.FeedBack,
                 "senderName":InfoData.Name
                
              }
              BusyIndicator.show();
            $.ajax({
                url: "https://email-feed-back-sapa.vercel.app/Email",
                method: "POST",
                data: JSON.stringify(pa),
                dataType: "json",
                contentType: "application/json",
                success: function(data){
                    BusyIndicator.hide()
                    console.log("Response Data:", data.Messsage);
                    that.getOwnerComponent().getModel("FeedbackModel").setData({});
                    that.getOwnerComponent().getModel("FeedbackModel").refresh(true);
                    sap.m.MessageToast.show("Successfully Submitted Data");
                    oEvent.getSource().getParent().close();
                },
                error:function(err){
                    BusyIndicator.hide()
                    console.error("AJAX Error Details:", err);
                    sap.m.MessageToast.show("Error occurred: " + (err.statusText || "Unknown Error"));
                    oEvent.getSource().getParent().close();
                }
            });
    
           
           
            
            }
            
        },
        getExperience: function (startDate) {
            var start = new Date(startDate); 
            var now = new Date(); 
            var years = now.getFullYear() - start.getFullYear(); 
            var months = now.getMonth() - start.getMonth(); 
            var days = now.getDate() - start.getDate(); 
            if (months < 0) {
                years--; 
                months += 12;
                        }
            if (days < 0) {
                months--; 
                var previousMonth = new Date(now.getFullYear(), now.getMonth(), 0); 
                days += previousMonth.getDate();
            }
            this.getOwnerComponent().getModel("viewModel").setProperty("/experience",`${years}Y ${months}M ${days}D`);
            this.getOwnerComponent().getModel("viewModel").refresh(true);
        }
        
      
    });
});