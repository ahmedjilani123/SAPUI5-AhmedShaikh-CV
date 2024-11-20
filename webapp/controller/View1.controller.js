sap.ui.define([
    "./BaseController"
], (BaseController) => {
    "use strict";

    return BaseController.extend("ascv.sap.portfolio.controller.View1", {
        onInit() {
          
         },
        onAfterRendering: function () {
            debugger
            var taskDetail = this.getView().byId("taskDetailPage");
            var sTheme = localStorage.getItem("theme");
            var bDarkMode = sTheme === "true";
            var DesignModel = bDarkMode ? "sap_horizon_dark" : "sap_horizon";
            sap.ui.getCore().applyTheme(DesignModel);
            var oModel = this.getView().getModel("viewModel");
            oModel.setProperty("/isDarkMode", bDarkMode);
            this.MessageStripCloseAction()
        },
        SWitchThemePress: function (data) {
            var DesignModel = data.getParameter("state") ? "sap_horizon_dark" : "sap_horizon";
            localStorage.setItem("theme", data.getParameter("state"));
            sap.ui.getCore().applyTheme(DesignModel);
            var oModel = this.getView().getModel("viewModel");
            oModel.setProperty("/isDarkMode", data.getParameter("state"));
        },
      
    });
});