sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	var apiUrl = "//api.themoviedb.org/3/",
		api_poster_url = "//image.tmdb.org/t/p/w154/",
		apiKey = "20e949c0a8e65d7f48c565a02b3c6b6c";

	return Controller.extend("com.sap.moviesdb.controller.Home", {
		onInit: function() {
			var oModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oModel);
		},
		
		onSearch: function(oEvent) {
			var sYear = oEvent.getParameter("query"),
				oModel = this.getView().getModel();

			jQuery.ajax({
				url: apiUrl + 'discover/movie?primary_release_year=' + sYear + '&sort_by=vote_average.desc&api_key=' + apiKey
			}).then(function(oResult) {
				oModel.setData(oResult);
			});
		}
	});
});