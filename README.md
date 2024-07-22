# Boggle Solver

This app was made to solve boggle puzzle boards. Boggle is a board game that was released in 1972 in which players attempt to create as many words as they can from a 4x4 grid of English letters. This program employs a pruned Trie structure to speed up the generation of candidate words.

## Notes

The app is still in development, the next steps for development will be:
- Input reseliency
- UI enhancements
- Grid expansion

## Features

The main features of this board are the solving and randomization mechanisms. The board itself is solved by implementing a Trie structure that employs pruning to speed up the process of looking up words. I chose boggle to explore how Trie structures are implemented and during development, I could see in real-time how pruning drastically improves the runtime of finding candidate words.