import errorHandler from '../../src/middlewares/ErrorHandler';

describe('#errorHandler', () => {
  const mockedJson = jest.fn();
  const mockedNext = jest.fn();

  it('should return internal server error message with 500 status if no error was provided', () => {
    const expectedResponse = {
      message: 'Internal server error',
      status: 500
    };

    const error = new Error();

    const res = {
      status: jest.fn(),
      json: mockedJson,
      headersSent: false
    };

    errorHandler(error, null, res, mockedNext);

    expect(mockedJson).toHaveBeenCalledWith(expectedResponse);
  });

  it('should return Course not found message with 404 status if not found was provided', () => {
    const expectedResponse = {
      message: 'Course not found',
      status: 404
    };

    const error = new Error();
    error.message = 'Course not found';
    error.status = 404;

    const res = {
      status: jest.fn(),
      json: mockedJson,
      headersSent: false
    };

    errorHandler(error, null, res, mockedNext);

    expect(mockedJson).toHaveBeenCalledWith(expectedResponse);
  });

  it('should call next function and pass error when headersSent is true', () => {
    const error = new Error();
    error.message = 'Course not found';
    error.status = 404;

    const res = {
      status: jest.fn(),
      json: mockedJson,
      headersSent: true
    };
    errorHandler(error, null, res, mockedNext);

    expect(mockedNext).toHaveBeenCalledWith(error);
  });
});
