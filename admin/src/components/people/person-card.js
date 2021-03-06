import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import PersonDragPreview from './person-drag-preview'

class PersonCard extends Component {
  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage())
  }

  render() {
    const { person, connectDragSource, isDragging } = this.props
    const dndStyle = {
      opacity: isDragging ? 0.3 : 1
    }

    return (
      <div style={dndStyle}>
        {connectDragSource(<h3>{person.email}</h3>)}
        <h4>{person.firstName}</h4>
        <h4>{person.lastName}</h4>
      </div>
    )
  }
}

const spec = {
  beginDrag(props) {
    return {
      //            person: props.props
      id: props.person.id,
      DragPreview: PersonDragPreview
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})

export default DragSource('person', spec, collect)(PersonCard)
