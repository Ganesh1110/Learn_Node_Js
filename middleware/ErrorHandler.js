export const CommonError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: err.status || 500,
    error: err.message || "Something went wrong!",
  });
};
