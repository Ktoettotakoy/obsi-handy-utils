// return index of a line that contains the ## Content
function findContentsLine(fileContent: string): number {
    const lines = fileContent.split("\n");
    return lines.findIndex(line => line.trim() === "## Content:");
}

function findThreeDashesAfterContents(fileContent:string, contentIndex: number): number {
    let lines = fileContent.split("\n");
    return lines.findIndex((line, i) => i > contentIndex && line.trim() === "---");
}

function findAllHeadingsInOrder(fileContent: string): string[] {
    const headingRegex = /^(#{1,6})\s+(.*)$/;

    const lines = fileContent.split("\n");
    const headings: string[] = [];
    for (let i = 0; i < lines.length; i++) {
        const match = lines[i].match(headingRegex);
        if (match && lines[i].trim() !== "## Content") {
            headings.push(lines[i].trim());
        }
    }

    return headings;
}

export { findContentsLine, findAllHeadingsInOrder, findThreeDashesAfterContents }
