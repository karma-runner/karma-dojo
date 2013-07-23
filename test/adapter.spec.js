describe('adapter dojo', function() {
  var getText, originalGetTextSpy;

  beforeEach(function() {
    var files = {
      '/base/some/file.js': '12345'
    };

    originalGetTextSpy = jasmine.createSpy('require.getText');
    getText = createPatchedGetText(files, originalGetTextSpy);
  });


  it('should add timestamp', function() {
    getText('/base/some/file.js',true,function(){});

    expect(originalGetTextSpy).toHaveBeenCalled();
    expect(originalGetTextSpy.argsForCall[0][0]).toBe('/base/some/file.js?12345');
  });


  it('should not append timestamp if not found', function() {
    getText('/base/other/file.js',true,function(){});

    expect(originalGetTextSpy).toHaveBeenCalled();
    expect(originalGetTextSpy.argsForCall[0][0]).toBe('/base/other/file.js');
  });


  describe('normalizePath', function() {

    it('should normalize . and .. in the path', function() {
      expect(normalizePath('/base/a/../b/./../x.js')).toBe('/base/x.js');
    });


    it('should preserve .. in the beginning of the path', function() {
      expect(normalizePath('../../a/file.js')).toBe('../../a/file.js');
    });
  });
});
