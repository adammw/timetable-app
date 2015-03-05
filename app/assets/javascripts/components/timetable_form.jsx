var TimetableForm = React.createClass({
  getInitialState: function() {
    return { selectedUnits: {}, selectedActivities: {} };
  },
  unitSelectionChanged: function(selectedUnits) {
    this.setState({ selectedUnits: selectedUnits }, function() {
      this.refs.activitySelector.updateActivities();
    });
  },
  activitySelectionChanged: function(selectedActivities) {
    this.setState({ selectedActivities: selectedActivities });
    this.refs.linkGenerator.setDisabledState(!_.values(selectedActivities).length);
  },
  render: function() {
    return (
      <div className="pure-g">
        <div className="pure-u-1-5">
          <strong>STEP 1</strong>
        </div>
        <div className="pure-u-4-5">
          <div className="pure-form">
            <fieldset>
              <legend>Add your units:</legend>
              <UnitSelection onChange={this.unitSelectionChanged} />
            </fieldset>
          </div>
        </div>
        <div className="pure-u-1-5">
          <strong>STEP 2</strong>
        </div>
        <div className="pure-u-4-5">
          <form className="pure-form">
            <fieldset>
              <legend>Select your allocation:</legend>
              <ActivitySelection ref="activitySelector" units={this.state.selectedUnits} onChange={this.activitySelectionChanged} />
            </fieldset>
          </form>
        </div>
        <div className="pure-u-1-5">
          <strong>STEP 3</strong>
        </div>
        <div className="pure-u-4-5">
          <LinkGenerator ref="linkGenerator" activities={this.state.selectedActivities} />
        </div>
      </div>
    );
  }
})
