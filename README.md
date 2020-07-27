# functional-blockchain

The implementation is refering to [this blog](https://www.hackdoor.io/articles/BwJeDQnm/writing-a-blockchain-in-node-js?source=gama).

Blockchain consist of blocks that are chained together. A representation of block could look like this:

```js
{
  timestamp:    1568468720410,
  data:         "I am a block", // could be anything – number, object, etc.
  previousHash: "2510c39011c5be704182423e3a695e91", // hash that reference to previous block, thus it is chained
  hash:         "363b122c528f54df4a0446b6bab05515" // hash of the data of the current block, if the data changes, hash changes
}
```

Since every block represent the previous blocks, then if the previous block changes, the rest of the blocks that chained afterwards will become invalid.


