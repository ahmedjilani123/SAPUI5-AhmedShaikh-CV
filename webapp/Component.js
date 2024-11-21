sap.ui.define([
    "sap/ui/core/UIComponent",
    "ascv/sap/portfolio/model/models",
"sap/ui/Device"
], (UIComponent, models,Device) => {
    "use strict";

    return UIComponent.extend("ascv.sap.portfolio.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);
           var iPagesCount = 1;
			if (Device.system.desktop) {
				iPagesCount = 4;
			} else if (Device.system.tablet) {
				iPagesCount = 3;
			}

            // set the device model
            this.setModel(models.createDeviceModel(), "device");
    
            var omdeol =this.getModel("ColumnLayout");
                omdeol.setData({FLayout:"OneColumn"})
                omdeol.refresh(true);

            var CarouselModel = this.getModel("CarouselModel");
                CarouselModel.setData({CountPage:iPagesCount});
                CarouselModel.refresh(true);
            // enable routing
            this.getRouter().initialize();
        }
    });
});