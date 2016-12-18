<table>
	<tr>
		<th ng-repeat="column in vm.columns" ng-init="field = column.field">
			<div>
				<span>{{field}}</span>
				<button ng-click="vm.sort_click(field, $event.ctrlKey)">{{vm.get_sort_description(field)}}</button>
			</div>
		</th>
	</tr>
	<tr ng-repeat="row in vm.rows | filter: vm.search || undefined" ng-class="{selected: row._selected}">
		<td ng-repeat="column in vm.columns" ng-init="field = column.field" ng-click="vm.row_click(row, column, $event)" ng-dblclick="vm.edit_start(row, column)">
			<input type="text" ng-if="vm.edit.row == row &amp;&amp; vm.edit.column.field == field"
			 ng-model="row[field]" ng-keydown="vm.edit_keydown($event)" ng-blur="vm.edit_end()" focus />
			<span ng-if="vm.edit.row != row || vm.edit.column.field != field">{{row[field]}}</span>
		</td>
	</tr>
</table>
