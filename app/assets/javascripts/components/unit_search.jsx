var UnitSearch = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onSubmit && this.props.onSubmit();
    var query = this.refs.query.getDOMNode().value.trim();
    $.ajax({
      url: '/subjects',
      data: {
        query: query
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
