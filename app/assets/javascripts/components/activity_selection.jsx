var ActivitySelection = React.createClass({
  getInitialState: function() {
    return { selectedActivities: {}, activities: {}, activityGroups: {} };
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
    Object.keys(this.props.units).forEach(function(unitCode) {
      if(this.state.activities[unitCode]) return;
      $.getJSON('https://cors-anywhere.herokuapp.com/https://allocate.swin.edu.au/aplus/rest/timetable/subject/' + unitCode + '/activities').then(function(results) {
        var unitActivities = this.activityMapForUnit(results);
        var activities = _.clone(this.state.activities);
        activities[unitCode] = unitActivities;
        var selectedActivities = _.clone(this.state.selectedActivities);
        selectedActivities[unitCode] = this.defaultActivitiesForUnit(unitActivities);
        this.setState({ activities: activities, selectedActivities: selectedActivities });
        this.props.onChange && this.props.onChange(selectedActivities);
      }.bind(this));
      $.getJSON('https://cors-anywhere.herokuapp.com/https://allocate.swin.edu.au/aplus/rest/timetable/subject/' + unitCode + '/activity_groups').then(function(results) {
        var activityGroups = _.clone(this.state.activityGroups);
        activityGroups[unitCode] = results;
        this.setState({ activityGroups: activityGroups });
      }.bind(this));
    }, this);
  },
  render: function() {
    return (
      <div className="activity-selection">
        <div className="pure-g">
          {Object.keys(this.state.activities).map(function(unitCode) {
            var activities = this.state.activities[unitCode],
                activityGroups = this.state.activityGroups[unitCode];
                unit = this.props.units[unitCode];
            if(!activities || !activityGroups) return;
            return (
              <div className="pure-u-1-2" key={unitCode}>
                <h3 className="content-subhead">{unitCode}</h3>
                <p>{unit.description}</p>
                  {Object.keys(activityGroups).map(function(activityGroupCode) {
                    return (
                      <div className="pure-form pure-g activity-group-selection" key={[unitCode,activityGroupCode].join('-')}>
                        <label className="pure-u-1-5"><abbr title={activityGroups[activityGroupCode].description}>{activityGroupCode}</abbr></label>
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
          }, this)}
        </div>
      </div>
    );
  }
});