import React, { Component } from 'react'
import { Timer } from './Timer'

export class ErrorBoundary extends Component {
  state = {
    errorMessage: '',
    errorTime: new Date(),
    guid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, (c) => {
      const r = Math.floor(Math.random() * 16)
      return r.toString(16)
    }),
  }
  static getDerivedStateFromError(error: any) {
    return { errorMessage: error.toString() }
  }
  componentDidCatch(error: any, info: any) {}

  render() {
    if (this.state.errorMessage) {
      return (
        <>
          <h1>
            <div
              style={{
                fontFamily: 'Segoe UI Light,Segoe UI,Segoe,Tahoma,Helvetica,Arial,sans-seri',
                whiteSpace: 'nowrap',
              }}
            >
              Sorry, something went wrong
            </div>
          </h1>
          <div>
            <span>An unexpected error has occurred.</span>
          </div>
          <div>
              <div
                style={{
                  float: 'left',
                  fontSize: '.85em',
                  fontFamily:
                    'Segoe UI,Segoe,Tahoma,Helvetica,Arial,sans-serif',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: '#666',
                }}
              >
                Technical Details
              </div>
            <div>
              <div>
                <p>
                  <span className='ms-descriptiontext'></span>
                </p>
                <div>
                  <span>
                    {this.state.errorMessage}
                  </span>
                </div>

                <p></p>
                <p>
                  <span className='ms-metadata'>
                    Correlation ID: {this.state.guid}
                  </span>
                </p>
                <p>
                  <span className='ms-metadata'>
                    Date and Time: {this.state.errorTime.toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <p>
            This was a salute to SharePoint error messages :)
          </p>
          <p>
            Restarting in <Timer /> secs...
          </p>
        </>
      )
    }
    return this.props.children
  }
}
