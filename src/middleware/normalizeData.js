const normalize = {
  lowercase: ["email", "username", "title", "album", "name", "bio"],
  uppercase: ["role"],
};
export async function normalizeDataMiddleware(req, res, next) {
  if (!req.body) return next();

  const normalizeData = { ...req.body };

  normalize.lowercase.forEach((e) => {
    if (normalizeData[e]) {
      normalizeData[e] = normalizeData[e].toLowerCase();
    }
  });

  normalize.uppercase.forEach((e) => {
    if (normalizeData[e]) {
      normalizeData[e] = normalizeData[e].toUpperCase();
    }
  });

  req.body = normalizeData;
  next();
}
