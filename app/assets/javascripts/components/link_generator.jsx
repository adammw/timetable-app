var LinkGenerator = React.createClass({
  getInitialState: function() {
    return { disabled: false, url: null };
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
      <form className="pure-form" onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Generate your iCal URL:</legend>&nbsp;
          <button type="submit" className="pure-button pure-button-primary" disabled={this.state.disabled}>Generate URL</button>
          { this.state.url ? <input value={this.state.url} className="url" readonly /> : null }
        </fieldset>
      </form>
    );
  }
});
