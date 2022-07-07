import React from 'react';
import { connect } from 'react-redux';
import { setHasError } from '../store/app';
import Error from './Error';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
    this.setState((state) => {
      return { ...state, error };
    });
  }

  render() {
    if (this.state.hasError || this.props.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <Error />
        </>
      );
    }
    return this.props.children;
  }
}

const mapStateToProps = (state) => ({
  hasError: state.app.hasError,
});

const mapDispatchToProps = {
  setHasError,
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);
