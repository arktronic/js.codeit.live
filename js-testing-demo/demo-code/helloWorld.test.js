describe("Hello World function", function() {
  it("should exist", function() {
    expect(helloWorld).toBeDefined();
  });
  
  it("should return the expected value", function() {
    var expectedValue = "Hello World";
    var actualValue = helloWorld();
    
    expect(actualValue).toEqual(expectedValue);
  });
});