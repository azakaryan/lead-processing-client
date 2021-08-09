import React from 'react';
import './Emails.css';
import { Dropdown } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Email, EmailStatus } from '../shared/api';
import { getEmails, updateEmailStatus, uploadEmails } from '../shared/api/adminApi';


class Emails extends React.Component {
  state = { emails: [], error: null };
  private statuses = Object.values(EmailStatus).map((status: string) => ({
    key: status,
    text: status,
    value: status,
  }));

  loadEmails = async () => {
    try {
      const emails = await getEmails();
      this.setState({ emails });
    } catch(error) {
      // TODO. Implement better Error handling.
    }
  };

  componentDidMount() {
    this.loadEmails();
  }
  
  onEmailStatusChange = async (email: Email, selectedStatus: EmailStatus, event: any) => {
    if (window.confirm('Are you sure you want to update status ?')) {
      try {
        await updateEmailStatus(email.emailId, selectedStatus);
        debugger
      } catch (error) {
        // TODO. Implement better Error handling and actions.
        alert("Page will be refreshed.");
        window.location.reload();
      }
    }
  }

  private renderEmails() {
    return this.state.emails.map((email: Email) => {

      return (
        <tr key={email.emailId}>
          <td><div className="body-content">{email.body}</div></td>
          <td>{email.date}</td>
          <td>{email.emailLead}</td>
          <td>{email.subject}</td>
          <td>{email.resolvedBy}</td>
          <td className="right aligned status-column">
            <span>
              <Dropdown
                onChange={(event, data: any) => this.onEmailStatusChange(email, data.value, event)}
                inline
                options={this.statuses}
                defaultValue={email.status}
              />
            </span>
          </td>
        </tr>
      )
    });
  }

  private uploadEmails = async () => {
    if (window.confirm('Are you sure you want to reset the database and upload all emails from csv ?')) {
      try {
        await uploadEmails();      
      } catch(error) {
        // TODO. Implement better Error handling.
      }
    };
  };
  
  render() {
    return (
      <div>
        <h1>
          Admin page for emails.
          <Button floated="right" negative onClick={this.uploadEmails}>Upload all Emails</Button>
        </h1>

        <table className="ui unstackable table">
          <thead>
            <tr>
              <th>Body</th>
              <th>Date</th>
              <th>Email lead</th>
              <th>Subject</th>
              <th>Resolved by</th>
              <th className="right aligned">Status</th>
            </tr>
          </thead>
          <tbody>
            {this.renderEmails()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Emails;