import { Component, ReactNode } from 'react';
import StartPage from '../../pages/StartPage';

interface IErrorBoundaryProps {
  children: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
IErrorBoundaryProps,
IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <StartPage />;
    }

    return children;
  }
}
