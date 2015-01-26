var UnitSelection = React.createClass({
  getInitialState: function() {
    return { selectedUnits: {}, results: {} };
  },
  addUnit: function(unit) {
    var units = _.clone(this.state.selectedUnits);
    units[unit.subject_code] = unit;
    this.setState({ selectedUnits: units });
    this.props.onChange(units);
  },
  removeUnit: function(unit) {
    var units = _.omit(this.state.selectedUnits, unit.subject_code);
    this.setState({ selectedUnits: units });
    this.props.onChange(units);
  },
  populateSearchResults: function(results) {
    this.setState({ results: results });
  },
  filteredResults: function() {
    return _.omit(this.state.results, Object.keys(this.state.selectedUnits));
  },
  render: function() {
    return (
      <div className="unit-selection">
        <UnitSearch onResults={this.populateSearchResults} ref="search" />
        <UnitList onRemove={this.removeUnit} units={this.state.selectedUnits} />
        <div className="unit-search-results">
          <UnitList onAdd={this.addUnit} units={this.filteredResults()} />
        </div>
      </div>
    );
  }
});
