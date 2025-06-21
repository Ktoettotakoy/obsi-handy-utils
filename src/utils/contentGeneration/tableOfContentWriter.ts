function replaceTOCBetweenContentAndRule(
    fileContent: string, tocLines: string[],
    contentIndex: number, dashIndex: number
): string {
    const lines = fileContent.split("\n");

    // Ensure at least one blank line before the rule
    if (tocLines.length === 0 || tocLines[tocLines.length - 1].trim() !== "") {
        tocLines.push("");
    }

    const before = lines.slice(0, contentIndex + 1);
    const after = lines.slice(dashIndex);

    const newLines = [...before, ...tocLines, ...after];
    return newLines.join("\n");
}



function generateTOCLines(orderedHeadings: string[]): string[] {
    return orderedHeadings.map(heading => {
        const indent = calculateIndentationBasedOnHashTags(heading);
        const cleanTitle = heading.replace(/^#+\s*/, "#").trim();
        return "\t".repeat(indent) + "- [[" + cleanTitle + "]]";
    });
}

// calculates the indentation based on number of #
// returns number of tab chars needed
function calculateIndentationBasedOnHashTags(line:string): number {
    const match = line.match(/^(#{1,6})\s+/);
    return match ? match[1].length - 1 : 1;
}

export { generateTOCLines, replaceTOCBetweenContentAndRule }
