const { trampoline } = require('./fp')
const { calculateHash, updateHash, nextNonce } = require('./hash')

// The first block in the Blockchain is called "The Genesis Block"

function generateGenesisBlock() {
    const block = {
        timestamp: + new Date(),
        data: "Genesis Block",
        previousHash: "0",
    }
    const hash = calculateHash(block)
    return { ...block, hash }
}

function mineBlock(checkConstraint, block) {
    function mine(block) {
        return checkConstraint(block.hash)
            ? block
            : () => mine(nextNonce(block))
    }
    return trampoline(mine(block))
}

const constraints = {
    padZeros(reps) {
        return hash => hash.substr(0, reps) === "0".repeat(reps)
    }
}

function addBlockWithConstraint(constraint) {
    return (chain, data) => {
        const { hash: previousHash } = chain[chain.length - 1]
        const block = updateHash({ timestamp: + new Date(), data, previousHash, nonce: 0 })
        const newBlock = mineBlock(constraint, block)
        return chain.concat(newBlock)
    }
}

module.exports = {
    generateGenesisBlock,
    addBlockWithConstraint,
    constraints
}