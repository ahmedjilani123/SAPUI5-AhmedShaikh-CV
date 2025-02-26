sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/Device",
    "sap/uxap/ObjectPageSubSection",
    "sap/m/ObjectStatus",
    "sap/ui/layout/VerticalLayout",
    "sap/m/PDFViewer",
    "sap/m/library"
  ], (Controller,Device,ObjectPageSubSection,ObjectStatus,VerticalLayout,PDFViewer,MLibrary) => {
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
            let LinkName=this.getOwnerComponent().getModel("SocialMedia").getData();
            LinkName.forEach(ele=>{
            if(ele.name == sText[0]){
                MLibrary.URLHelper.redirect(ele.url, true);
            }
            })
        },
        handleSelectionChange: function () {
            const selectedText = window.getSelection().toString().trim();
            if (selectedText) {
              window.speechSynthesis.cancel();
              const utterance = new SpeechSynthesisUtterance(selectedText);
              const voices = window.speechSynthesis.getVoices();
          utterance.voice = voices[6];
          utterance.pitch = 1; 
          utterance.rate = 1;  
        window.speechSynthesis.speak(utterance);
            }
          },
          ExperienceSectionBuild:function(){
            var oObjectPageSection = this.byId("experienceSection");
            var oModels = this.getView().getModel("ExperienceModel");
            var aExperienceData = oModels.getProperty("/experience");
            aExperienceData.forEach(function (experience) {
                var oSubSection = new ObjectPageSubSection({
                    title: experience.title
                });
                var oLayout = new VerticalLayout();
                oLayout.addContent(new ObjectStatus({
                    title: "Client Name",
                    text: experience.clientName
                }));
                oLayout.addContent(new ObjectStatus({
                    title: "Role",
                    text: experience.role
                }));
                oLayout.addContent(new ObjectStatus({
                    title: "Team Size",
                    text: experience.teamSize
                }));
                oLayout.addContent(new ObjectStatus({
                    title: "Environment",
                    text: experience.environment
                }));
                oLayout.addContent(new ObjectStatus({
                    title: "Project Information",
                    text: experience.projectInfo
                }));
                oSubSection.addBlock(oLayout);
                oObjectPageSection.addSubSection(oSubSection);
            });
          },
          onNavBack(){
            let router = this.getOwnerComponent().getRouter();
            router.navTo("RouteView1");
        },
        AvatarPress:function(){
             this.Dialog ??= new sap.ui.xmlfragment("ascv.sap.portfolio.Fragments.ProfileShow",this);
             this.getView().addDependent(this.Dialog);
              this.Dialog.open();
        },
        CloseProfilePress:function(oEvent){
            oEvent.getSource().getParent().close();
           
        },
        callPress:function(){
            MLibrary.URLHelper.triggerTel("+91 6353038823")
        }
    });
  });