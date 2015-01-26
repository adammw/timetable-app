var UnitSearch = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onSubmit && this.props.onSubmit();
    var query = this.refs.query.getDOMNode().value.trim();
    $.ajax({
      method: 'POST',
      url: 'https://cors-anywhere.herokuapp.com/https://allocate.swin.edu.au/aplus/rest/timetable/subjects',
      data: {
        'search-term': query
      },
      dataType: 'json'
    }).then(function(results) {
      this.props.onResults(results);
    }.bind(this));
  },
  render: function() {
    return (
      <form className="unit-search" onSubmit={this.handleSubmit}>
        <input type="search" ref="query" placeholder="Unit Code" />
        &nbsp;
        <button type="submit" className="pure-button">Search</button>
      </form>
    );
  }
});
