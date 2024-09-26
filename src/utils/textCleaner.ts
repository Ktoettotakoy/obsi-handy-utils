function cleanInputStringMdFormat(stringToClean:string): string{
    // Remove Markdown images: ![alt text](url)
    stringToClean = stringToClean.replace(/!\[.*?\]\(.*?\)/g, '');

    // Remove Markdown images: ![link]
    stringToClean = stringToClean.replace(/!\[\[.*?\]\]/g, '')

    // Optional: Remove HTML-style links: <http://example.com>
    stringToClean = stringToClean.replace(/<http.*?>/g, '');

    return stringToClean;

    // Maybe later find other useful regexes.
    // images  
    // /!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/g
    // advanced images 
    // \[?(!)(?'alt'\[[^\]\[]*\[?[^\]\[]*\]?[^\]\[]*)\]\((?'url'[^\s]+?)(?:\s+(["'])(?'title'.*?)\4)?\)
};

export { cleanInputStringMdFormat }