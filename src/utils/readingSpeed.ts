function calculateReadingSpeed(readingSpeed: number, textToRead: string ): {minutes: number, seconds: number}{
    // Word count
    const wordCount = textToRead.split(/\s+/).filter(word => word.length > 0).length;
    // Reading time 
    const totalMinutes = wordCount / readingSpeed;
    
    // split to minutes and seconds
    const minutes = Math.floor(totalMinutes);
    const seconds = Math.round((totalMinutes - minutes) * 60);

    // return result
    return {minutes, seconds};
}

export { calculateReadingSpeed };