const { trampoline } = require('./fp')
const { calculateHash } = require("./hash")

function validateChain(chain) {
    function tce(chain, index) {
        if (index === 0) return true
        const { hash, ...currentBlockWithoutHash} = chain[index]
        const currentBlock = chain[index]
        const previousBlock = chain[index - 1]
        const isValidHash = (hash === calculateHash(currentBlockWithoutHash))
        const isPreviousHashValid = (currentBlock.previousHash === previousBlock.hash)
        const isValidChain = (isValidHash && isPreviousHashValid)

        if (!isValidChain) return false
        else return () => tce(chain, index - 1)
    }
    return trampoline(() => tce(chain, chain.length - 1))
}

module.exports = {
    validateChain
}