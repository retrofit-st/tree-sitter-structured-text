# tree-sitter-structured-text

**[tree-sitter]("https://tree-sitter.github.io/tree-sitter/") grammar for structured text.**

Structured text is an ancient programming language derived from Pascal and is mostly used in automation. There are ongoing efforts to bring it into the present, so I thought it also needs a tree-sitter implementation.

Unfortunatly there does not seem to be an easy obtainable copy of the spec, so I mostly stared at code and implemented the grammar as best as I could. So there is probably still a lot of grammar missing.

I will deploy this to package registries once I feel happy with the grammar.

## How to use

Clone the repository and from the command line:

```sh
# Clone the repo
git clone https://github.com/mi-tal/tree-sitter-structured-text.git

# Change into the repo
cd tree-sitter-structured-text

# Install dependencies
npm install
```

There is also a devcontainer where all the dependencies and extensions needed for development are installed.

## Contributing

Pull requests are welcome. If you find grammar missing, please open an issue and we'll discuss how to bring your change into the grammar.

## License

[MIT](https://choosealicense.com/licenses/mit/)
