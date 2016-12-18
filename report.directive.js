(function(){
	angular
	 .module('report')
	 .directive('report', report)
	 .directive('focus', focus);

	report.$inject = [];
	function report() {
		return {
			restrict: 'EA',
			scope: {
				rows: '<?',
				columns: '<?',
				sort: '<?',
				// exposes logic
				selected: '=?',
				search: '=?',
				core: '='
			},
			bindToController: true,
			controller: 'report',
			controllerAs: 'vm',
			templateUrl: 'scripts/report/report.template.html',
			transclude: {
				edit: '?edit'
			}
		};
	}

	focus.$inject = [];
	function focus() {
		return {
			restrict: 'A',
			link: function($scope, element) {
				element[0].focus();
			}
			};
	}
})();
