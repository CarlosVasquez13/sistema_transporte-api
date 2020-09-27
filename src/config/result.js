var Result = {
  Success: true,
  Error: false,
  Exception: null,
  Response: null,
  Items: [],

  createResult: function () {
    return {
      Success: true,
      Error: false,
      Exception: null,
      Response: null,
      Items: [],
    };
  },
};

module.exports = Result;
