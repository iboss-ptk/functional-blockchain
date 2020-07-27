const { generateGenesisBlock ,addBlockWithConstraint, constraints } = require('./block')

const addBlock = addBlockWithConstraint(constraints.padZeros(4))
const chain = [generateGenesisBlock()]

const newChain = addBlock(chain, "next block")

console.log(newChain)