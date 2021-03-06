var ActivitySelection = React.createClass({
  getInitialState: function() {
    return { selectedActivities: {}, activities: {}, subjects: {} };
  },
  activityMapForUnit: function(activities) {
    var activityMap = {};
    Object.keys(activities).forEach(function(activityCode) {
      var code = activityCode.split('|');
      activityMap[code[1]] = activityMap[code[1]] || {};
      activityMap[code[1]][code[2]] = activities[activityCode];
    });
    return activityMap;
  },
  defaultActivitiesForUnit: function(activities) {
    var defaultActivitiesMap = _.cloneDeep(activities);
    Object.keys(defaultActivitiesMap).forEach(function(activityGroupCode) {
      var defaultActivityCode = Object.keys(activities[activityGroupCode])[0]
      defaultActivitiesMap[activityGroupCode] = activities[activityGroupCode][defaultActivityCode];
    });
    return defaultActivitiesMap;
  },
  handleChange: function(unitCode, activityGroupCode, e) {
    var activityCode = e.target.value;
    var selectedActivities = _.cloneDeep(this.state.selectedActivities);
    selectedActivities[unitCode][activityGroupCode] = this.state.activities[unitCode][activityGroupCode][activityCode];
    this.setState({ selectedActivities: selectedActivities });
    this.props.onChange && this.props.onChange(selectedActivities);
  },
  updateActivities: function() {
    var addedUnits = _.difference(Object.keys(this.props.units), Object.keys(this.state.activities));
    var removedUnits = _.difference(Object.keys(this.state.activities), Object.keys(this.props.units));
    console.log('addded', addedUnits, 'removed', removedUnits, this.props, this.state);
    addedUnits.forEach(function(unitCode) {
      $.getJSON('/subjects/' + unitCode + '/activities').then(function(results) {
        var unitActivities = this.activityMapForUnit(results);
        var activities = _.clone(this.state.activities);
        activities[unitCode] = unitActivities;
        var selectedActivities = _.clone(this.state.selectedActivities);
        selectedActivities[unitCode] = this.defaultActivitiesForUnit(unitActivities);
        this.setState({ activities: activities, selectedActivities: selectedActivities });
        this.props.onChange && this.props.onChange(selectedActivities);
      }.bind(this));
      $.getJSON('/subjects/' + unitCode).then(function(results) {
        var subjects = _.clone(this.state.subjects);
        _.extend(subjects, results);
        this.setState({ subjects: subjects });
      }.bind(this));
    }, this);
    removedUnits.forEach(function(unitCode) {
      var activities = _.clone(this.state.activities);
      var selectedActivities = _.clone(this.state.selectedActivities);
      delete activities[unitCode];
      delete selectedActivities[unitCode];
      this.setState({ activities: activities, selectedActivities: selectedActivities });
    }, this);
  },
  renderActivitiesForUnit: function(unitCode) {
    var activities = this.state.activities[unitCode],
        subject = this.state.subjects[unitCode];
        unit = this.props.units[unitCode];
    if(!activities || !subject || !unit) return;
    return (
      <div className="pure-u-1-2" key={unitCode}>
        <h3 className="content-subhead">{unitCode}</h3>
        <p>{unit.description}</p>
          {Object.keys(subject.groups).map(function(activityGroupCode) {
            var group = subject.groups[activityGroupCode];
            return (
              <div className="pure-form pure-g activity-group-selection" key={[unitCode,activityGroupCode].join('-')}>
                <label className="pure-u-1-5"><abbr title={group.description}>{activityGroupCode}</abbr></label>
                <select className="pure-u-4-5" disabled={Object.keys(activities[activityGroupCode]).length == 1} onChange={this.handleChange.bind(this, unitCode, activityGroupCode)}>
                  {Object.keys(activities[activityGroupCode]).map(function(activityCode) {
                    var activity = activities[activityGroupCode][activityCode];
                    return (
                      <option key={activityCode} value={activityCode}>{activityCode}: {activity.day_of_week} {activity.start_time} - {activity.location}</option>
                    );
                  }, this)}
                </select>
              </div>
            );
          }, this)}
      </div>
    );
  },
  render: function() {
    return (
      <div className="activity-selection">
        <div className="pure-g">
          {
            (Object.keys(this.state.activities).length == 0) ?
              (<div className="call-to-action pure-u-1">You must add your units above before you can make an allocation selection</div>) :
              Object.keys(this.state.activities).map(this.renderActivitiesForUnit, this)
          }
        </div>
      </div>
    );
  }
});
