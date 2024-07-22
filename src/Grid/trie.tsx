class TrieNode {
    public children: Map<string,TrieNode>;
    public endOfWord: boolean;
    
    constructor() {
        this.children = new Map<string,TrieNode>();
        this.endOfWord = false;
    }
}

class Trie {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    public Insert(word: string): void{
        let curr = this.root;
        for (const ch of word){
            if (!curr.children.has(ch))
                curr.children.set(ch, new TrieNode());
            curr = curr.children.get(ch)!;
        }
        curr.endOfWord = true;
    }

    public Search(word: string): boolean{
        let curr = this.root;
        for (const ch of word){
            if (!curr.children.has(ch))
                return false;
            curr = curr.children.get(ch)!;
        }
        return curr.endOfWord;
    }

    public CheckPrefix(prefix: string): boolean {
        let curr = this.root;
        for (const ch of prefix){
            if (!curr.children.has(ch))
                return false;
            curr = curr.children.get(ch)!;
        }
        return true;
    }
}

class BoggleParser {

    public trie: Trie;
    public rowMax: number;
    public colMax : number;
    public answers: Set<string>;

    constructor(){
        this.trie = new Trie();
        this.rowMax = 4;
        this.colMax = 4;
        this.answers = new Set<string>();
        this.CreateDictionary();
    }

    private async CreateDictionary() {
        try {
            // Fetch the file content from the public directory
            const response = await fetch('/dict.txt');
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            // Read the file content as text
            const fileContent = await response.text();
    
            // Split content into lines and trim each line
            const lines = fileContent.split('\n').map(line => line.trim());
    
            // Insert each line into the Trie
            for (const word of lines) {
                if (word.length > 0) { // Ensure it's not an empty line
                    this.trie.Insert(word);
                }
            }
            console.log('Dictionary loaded into Trie.');
        } catch (error) {
            console.error('Error reading or processing the file:', error);
        }
    }

    public SolveArray(input: string[][]): string[] {
        this.answers.clear();
        this.SolveBoard(input);
        const result: string[] = Array.from(this.answers);
        console.log(result)
        return result;
    }

    public SolveBoard(input: string[][]): void {
        let words: string[] = [];
        for (let row = 0; row < input.length; row++){
            for (let col = 0; col < input[0].length; col++){
                this.Solver(words,input,row,col,"");
                for (const word of words){
                    this.answers.add(word);
                }
                words = [];
            }
        }
        console.log(this.answers);
    }

    public Solver(current: string[], board: string[][], row: number, col: number, word: string){

        if (row >= this.rowMax || col >= this.colMax || row < 0 || col < 0 || board[row][col] === "*") return;

        word += board[row][col];
        if (!this.trie.CheckPrefix(word)) return;
        if (this.trie.Search(word) && word.length > 1) {
            // console.log(word);
            current.push(word);
        }

        const curr = board[row][col];
        board[row][col] = "*";
        
        this.Solver(current, board, row - 1, col - 1, word);
        this.Solver(current, board, row - 1, col, word);
        this.Solver(current, board, row - 1, col + 1, word);
        this.Solver(current, board, row, col - 1, word);
        this.Solver(current, board, row, col + 1, word);
        this.Solver(current, board, row + 1, col - 1, word);
        this.Solver(current, board, row + 1, col, word);
        this.Solver(current, board, row + 1, col + 1, word);

        board[row][col] = curr;
    }
}

const solverInstance = new BoggleParser();
export const solve = solverInstance.SolveArray.bind(solverInstance);
