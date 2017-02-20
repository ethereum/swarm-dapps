import build from '../../src/ethereum-markdown-reader';

describe('build', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(build, 'greet');
      build.greet();
    });

    it('should have been run once', () => {
      expect(build.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(build.greet).to.have.always.returned('hello');
    });
  });
});
