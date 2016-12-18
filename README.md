Report Specification
===
* Setting columns:
  * You can use the names of the columns, or a sort object
  * If no columns are set, then all possible columns are shown
    * If there are no columns to show, the report should still draw
* Setting the sort:
  * You can use the names of the columns, or an array [field, direction]
  * If no sort is set, then order by columns
* When sorting:
  * Single click sets a new sort
    * If the first sort column is single clicked, it will change sort direction
  * Ctrl click to change the sort order, or add additional sort levels
* When editing:
  * Double click to edit a cell
  * Doouble clicking a new cell will save the current changes
  * all changes are committed at the end of editing, and then the report will resort
  * Enter key submits, committing changes
  * Escape key cancels, restoring the value before the edit
  * If the editor loses focus, the edit is submitted
  * 
* When selecting:
  * Single click to select a row
    * Other rows will be deselected
  * Ctrl click on a row to toggle selection
* Search shows all rows that have a partial match to the search query

Known Issues
===
* Searching will show hidden fields (`_selected`)
* Ctrl click does not work on Mac
* Ctrl click does not work on Mobile

Definitions
===


Design Decisions
===
* Use single click to set, and Ctrl to modify
