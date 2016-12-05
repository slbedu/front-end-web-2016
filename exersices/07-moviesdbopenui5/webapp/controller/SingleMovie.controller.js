sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";
	var apiUrl = "//api.themoviedb.org/3/",
		apiKey = "20e949c0a8e65d7f48c565a02b3c6b6c";

	return Controller.extend("com.sap.moviesdb.controller.SingleMovie", {
		onNavBack: function() {
			var oHistory = History.getInstance(),
				sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Otherwise we go backwards with a forward histor..getRoute("object").attachPatternMatched(this._onObjectMatched, this);
				sap.ui.core.UIComponent.getRouterFor(this).navTo("movielist", {}, true);
			}
		},

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.moviesdb.view.SingleMovie
		 */
		onInit: function() {
			sap.ui.core.UIComponent.getRouterFor(this).getRoute("movie").attachPatternMatched(this._onRouteMatched, this);
			var oModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oModel);
		},

		_onRouteMatched: function(oEvent) {
			var sMovieId = oEvent.getParameter("arguments").movieid,
				oModel = this.getView().getModel(),
				sURL = apiUrl + 'movie/' + sMovieId + '?api_key=' + apiKey;

			jQuery.ajax({
				url: sURL
			}).then(function(oResult) {
				oModel.setData(oResult);
			});
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.moviesdb.view.SingleMovie
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.moviesdb.view.SingleMovie
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.moviesdb.view.SingleMovie
		 */
		//	onExit: function() {
		//
		//	}

	});

});