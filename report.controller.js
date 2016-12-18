(function(){
	angular
	.module('report')
	.controller('report', report);

	report.$inject = ['$scope'];
	function report($scope) {
		var vm = this;
		var _sort_order = [];
		var _sort_direction = [];
		vm.rows = [];
		vm.columns;

		vm.selected = [];
		vm.row_click = row_click;


		vm.edit_start = edit_start;
		vm.edit_keydown = edit_keydown;
		vm.edit_end = edit_end;
		vm.edit = {};

		vm.sort;
		vm.get_sort_description = get_sort_description;
		vm.get_sort_order = get_sort_order;
		vm.get_sort_direction = get_sort_direction;
		vm.sort_click = sort_click;

		vm.filter = filter;
		vm.search = "";

		vm.$onInit = $onInit;

		function $onInit() {
			//_.assign(
		if(vm.core) {
		_.assign(vm.core, {'add_row': add_row});
		 // vm.core.add_row = add_row;
		}

			if (!vm.columns) {
				// all keys ordered lexographically
				vm.columns = _.uniq(_.flatten(_.map(vm.rows, _.keys))).sort();

				if(!vm.columns.length) {
					vm.columns = [{field: null}];
					vm.sort = [[null, 'asc']];
				}
			}

			if(!vm.sort) {
				vm.sort = vm.columns;
			}

			vm.sort = _.map(vm.sort, function(v) {
				return _.isString(v)? [v, 'asc']:
				_.isObject(v)? [v.field, v.direction]:
				v
			});

			vm.columns = _.map(vm.columns, function(v) {
				return _.isString(v)? {field:v}:
				v
			});

			sort_changed();
			do_sort();

		// 	console.log('rows', vm.rows);
		// 	console.log('columns', vm.columns);
		}

		function row_click(row, column, $event) {
			console.log('row_click');
			var ctrlKey = $event.ctrlKey;
			var index = vm.selected.indexOf(row);
			if(ctrlKey && index != -1) {
			// modify selection
			row._selected = false;
			_.remove(vm.selected, row);
			} else if(ctrlKey) {
				// extend selection
			row._selected = true;
			vm.selected.push(row);
			} else if(!row._selected) {
				// reset selection
			_.forEach(vm.selected, function(row) {
			row._selected = false
			});
			row._selected = true;
			vm.selected.length = 0;
			vm.selected.push(row);
			}
		}

		function edit_start(row, column) {
			console.log('edit', row, column);
			vm.edit.value = row[column.field];
			vm.edit.row = row;
			vm.edit.column = column;
		}

		function edit_keydown($event) {
			if($event.key == 'Enter') {
			edit_end();
			} else if ($event.key == 'Escape') {
				vm.edit.row[vm.edit.column.field] = vm.edit.value;
				edit_end();
			}
		}

		function edit_end() {
			delete vm.edit.row;
			delete vm.edit.column;
			do_sort();
		}

		function sort_changed() {
			var sort = _.unzip(vm.sort);
			_sort_order = sort[0];
			_sort_direction = sort[1];
		}

		function do_sort() {
			var sort = _.unzip(vm.sort);
			vm.rows = _.orderBy(vm.rows, sort[0], sort[1]);
		}

		function get_sort_description(column) {
			var index = get_sort_order(column);
			return index == -1? "-": "" + index + _.toUpper(get_sort_direction(column).charAt(0));
		}

		function get_sort_order(column) {
			return _sort_order.indexOf(column);
		}

		function get_sort_direction(column) {
			var index = get_sort_order(column);
			return index == -1? "": _sort_direction[index];
		}

		function sort_click(column, ctrlKey) {
			console.log("sort_click", column, ctrlKey);
			var sort = _.unzip(vm.sort);
			var index = sort[0]? sort[0].indexOf(column): -1;
			if(ctrlKey && index != -1) {
			// modify sort
			vm.sort[index][1] = vm.sort[index][1] == 'asc'? 'desc': 'asc';
			} else if(ctrlKey) {
				// extend sort
				vm.sort.push([column, 'asc']);
			} else {
				// reset sort
			vm.sort = [[column, index === 0 && vm.sort[0][1] == 'asc'? 'desc':'asc']];
			}

			sort_changed();
			do_sort();
		}

		function filter(row) {
			if(!vm.search) return true;
			return _.some(columns, function(column) {
			_.match(row[column.field], vm.search);
			})

		}

		function add_row(row={}) {
			vm.rows.push(row);
			do_sort();
		}
	}
})();
