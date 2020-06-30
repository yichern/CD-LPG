import React, { Component } from 'react';
import { Container } from 'reactstrap';

import LessonDeleteModal from './LessonDeleteModal';

import LessonList from './LessonList';

export class LessonLanding extends Component {
  renderDelete = (lesson) => {
    return;
  };

  render() {
    return (
      <Container>
        <LessonList renderDelete={this.renderDelete} />
      </Container>
    );
  }
}

export default LessonLanding;
