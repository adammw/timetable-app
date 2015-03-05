var LinkGenerator = React.createClass({
  getInitialState: function() {
    return { disabled: true, url: null };
  },
  setDisabledState: function(disabled) {
    this.setState({ disabled: disabled });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var activities = _.flatten(_.values(this.props.activities).map(_.values)).map(function(activity) {
      return [activity.subject_code, activity.activity_group_code, activity.activity_code].join('|');
    });
    var params = { activities: activities };
    params[$('meta[name="csrf-param"]').attr('content')] = $('meta[name="csrf-param"]').attr('token');
    $.ajax({
      url: '/timetable',
      method: 'POST',
      data: JSON.stringify(params),
      contentType: 'application/json'
    }).then(function(result) {
      console.log('saved!', result);
      this.setState({ url: result.timetable.url.replace(/\.json$/, '') + '.ics' })
    }.bind(this), function() {
      console.log('error', arguments);
      this.setState({ disabled: false });
    });
    this.setState({ disabled: true });
  },
  render: function() {
    return (
      <form className="pure-form link-generator" onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Generate your iCal URL:</legend>
          <div className="pure-g">
            <div className="pure-u-1-4">
              <button type="submit" className="pure-button pure-button-primary" disabled={this.state.disabled}>Generate URL</button>
            </div>
            <input value={this.state.url} hidden={!this.state.url} className="url pure-u-3-4" readOnly={true} />
          </div>
        </fieldset>
      </form>
    );
  }
});
