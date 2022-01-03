import errorHandlerUtils from '../../src/utils/ErrorHandlerUtils';

const { createError } = errorHandlerUtils;

describe('ErrorHandlerUtils', () => {
  describe('#createError', () => {
    it('should return error with 404 status and Course not found message', () => {
      const expectedError = new Error();
      expectedError.message = 'Course not found';
      expectedError.status = 404;

      const actualError = createError(404, 'Course not found');

      expect(actualError).toEqual(expectedError);
    });
  });
});
