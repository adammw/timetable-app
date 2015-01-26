var UnitList = React.createClass({
  addUnit: function(unit, e) {
    e.preventDefault();
    this.props.onAdd(unit);
  },
  removeUnit: function(unit, e) {
    e.preventDefault();
    this.props.onRemove(unit);
  },
  render: function() {
    return (
      <ul className="unit-list">
        {Object.keys(this.props.units).map(function(unitCode) {
          var unit = this.props.units[unitCode];
          var listItemButtons = [];
          if(this.props.onAdd) {
            listItemButtons.push(<a href="#" key="add" onClick={this.addUnit.bind(this, unit)} className="icon-button icon-med icon-hover-highlight"><span className="icon-squared-plus"></span></a>);
          }
          if(this.props.onRemove) {
            listItemButtons.push(<a href="#" key="remove" onClick={this.removeUnit.bind(this, unit)} className="icon-button icon-med icon-hover-highlight"><span className="icon-squared-minus"></span></a>);
          }
          return (<li key={unitCode}>
            <div className="list-item-buttons">{listItemButtons}</div>
            <p><strong>{unitCode}</strong></p>
            <p>{unit.description}</p>
          </li>);
        }, this)}
      </ul>
    );
  }
});
