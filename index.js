const { generateGenesisBlock ,addBlockWithConstraint, constraints } = require('./block')
const { validateChain } = require('./chain')

const addBlock = addBlockWithConstraint(constraints.padZeros(4))
const chain = [generateGenesisBlock()]

console.log("=== GENESIS ===")
console.log(chain)
console.log("is genesis chain valid? :", validateChain(chain))
console.log("\n")

const newChain = addBlock(chain, {
    sender:   "ks829fh28192j28d9dk9",
    receiver: "ads8d91w29jsm2822910",
    amount:   0.0023,
    currency: "BTC"
})


console.log("=== UPDATED ===")
console.log(newChain)
console.log("is properly updated chain valid? : ", validateChain(newChain))
console.log("\n")

const contaminatedChain = [
    ...newChain,
    {
        timestamp: + new Date(),
        data: "Genesis Block",
        previousHash: newChain[newChain.length - 1].hash,
        hash: "invalidhash"
    }
]

console.log("=== CONTAMINATED ===")
console.log(contaminatedChain)
console.log("is contaminated chain valid? : ", validateChain(contaminatedChain))