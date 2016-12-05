sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	var apiUrl = "//api.themoviedb.org/3/",
		apiKey = "20e949c0a8e65d7f48c565a02b3c6b6c";

	return Controller.extend("com.sap.moviesdb.controller.MoviesList", {
		onInit: function() {
			var oModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oModel);
		},
		
		onSearch: function(oEvent) {
			var sYear = oEvent.getParameter("query"),
				oModel = this.getView().getModel(),
				oWelcomePanel = this.getView().byId("welcomePanel"),
				oMoviesPanel = this.getView().byId("moviesPanel");
			
			oWelcomePanel.setBusy(true);
			oMoviesPanel.setBusy(true);
			
			jQuery.ajax({
				url: apiUrl + 'discover/movie?primary_release_year=' + sYear + '&sort_by=vote_average.desc&api_key=' + apiKey
			}).then(function(oResult) {
				oModel.setData(oResult);
				oWelcomePanel.setBusy(false);
				oMoviesPanel.setBusy(false);
			});
			oMoviesPanel.setVisible(true);
			oWelcomePanel.setVisible(false);
		},
		
		onMoreInformationPresssed: function(oEvent) {
			var sMovieID = oEvent.getSource().getBindingContext().getProperty("id");
			this.getOwnerComponent().getRouter()
				.navTo("movie", { movieid:sMovieID });
		}
	});
});