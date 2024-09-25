import PropTypes from "prop-types";
import { Spinner, Alert } from "react-bootstrap";

export const LoadingOrError = ({ isLoading, error, children }) => {
  if (isLoading) {
    return (
      <div className="text-center vh-100">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center my-4">
        <Alert.Heading>¡Error!</Alert.Heading>
        <p>{error.message}</p>
      </Alert>
    );
  }

  return children;
};

// Validación de props
LoadingOrError.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  children: PropTypes.node.isRequired,
};
