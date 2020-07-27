const crypto = require('crypto')

// hash should have constraint like "starting with 0000", "end with f5"
// in order to make it hard to calculate the chain
// but hash is based on data, that why we need nonce
// in order to add a block to the chain, one must change nonce 
// until it conform the constraint
// nonce = number only used once
// more on this: https://www.investopedia.com/terms/n/nonce.asp#:~:text=A%20nonce%20is%20an%20abbreviation,meets%20the%20difficulty%20level%20restrictions.

function calculateHash({ previousHash, timestamp, data, nonce = 1 }) {
    const hash = crypto.createHash('sha256')
    hash.update(previousHash + timestamp + JSON.stringify(data) + nonce)
    return hash.digest('hex')
}