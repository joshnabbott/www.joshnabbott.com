const sanitize = (dirtyString) => dirtyString.replace(/\s{2,}/g, ' ')

module.exports = { sanitize: sanitize }
