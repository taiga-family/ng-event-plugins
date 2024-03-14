export function dasharize(camel: string): string {
    return camel.replaceAll(
        /[a-z][A-Z]/g,
        letterLetter => `${letterLetter[0]}-${letterLetter[1].toLowerCase()}`,
    );
}
