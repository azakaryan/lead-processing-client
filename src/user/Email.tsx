import React from 'react';
import "./Email.css";
import { Segment, Divider, Button } from 'semantic-ui-react';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { requestEmailForProcessing, processEmail } from '../shared/api/userApi';
import { EmailStatus } from '../shared/api';

class EmailShow extends React.Component {
  state = { emailBody: null, emailId: null, errors: [] };

  renderTime = ({ remainingTime }: { remainingTime: number }) => {  
    return (
      <div className="time-wrapper">
        <div key={remainingTime} className='time'>
          {remainingTime}
        </div>
      </div>
    );
  };

  onComplete = (message: string) => {
    setTimeout(() => {
      alert(message);
      window.location.reload();
    });
  }

  handleError(errors: { message: string }[]) {
    if (errors.length) {
      this.setState({ emailBody: null, errors });
    } else {
      this.onComplete("Something went wrong. Page will be refreshed.")
    }
  }

  loadEmail = async () => {
    try {
      const { body: emailBody, emailId } = await requestEmailForProcessing();
      this.setState({ emailBody, emailId });
    } catch(error) {
      // TODO. Implement Error handling.
      this.handleError(error?.data?.errors || []);
    }
  };
  
  replay = async (status: EmailStatus) => {
    try {
      await processEmail(this.state.emailId!, status);
      this.onComplete("Email Successfully processed, You will now get the next email on the list");
    } catch(error) {
      // TODO. Implement Error handling.
      this.handleError(error?.data?.errors || []);
    }
  };

  componentDidMount() {
    this.loadEmail();
  }

  renderErrors() {
    const errors =  this.state.errors.map((err: { message: string }, index) => (
      <div key={index} >{err.message}</div>
    ));

    if (!errors.length) return null;

    return (
      <div className="errors-container">
        {errors}
      </div>
    );
  }

  render() {
    if (!this.state.emailBody) return this.renderErrors();

    return (
      <div>
        <Segment>
          <div className="action-buttons-container">
            <Button positive onClick={() => this.replay(EmailStatus.PositiveReplay)}>Positive replay</Button>
            <Button primary onClick={() => this.replay(EmailStatus.NeutralReplay)}>Neutral replay</Button>
            <Button negative onClick={() => this.replay(EmailStatus.NotALead)}>Not a lead</Button>
          </div>
        </Segment>
        <Divider horizontal>
            <div className="timer-wrapper">
              <CountdownCircleTimer
                isPlaying
                size={60}
                duration={120}
                strokeWidth={4}
                onComplete={() => this.onComplete("Session expired. Page Will be refreshed")}
                colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000", 0.33]]}
              >
                {this.renderTime}
              </CountdownCircleTimer>
            </div>
        </Divider>
        <Segment className="body-container">
          <div className="display-linebreak">
            {this.state.emailBody}
          </div>
        </Segment>
      </div>
    );
  }
}

export default EmailShow;