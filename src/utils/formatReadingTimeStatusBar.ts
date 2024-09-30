function formatReadingTime(timeObj: {minutes: number, seconds:number}, format: string): string {
    switch (format) {
        case 'long':
            return `${timeObj.minutes} minutes and ${timeObj.seconds} seconds`;
        case 'short':
            return `${timeObj.minutes}m ${timeObj.seconds}s`;
        case 'compact':
            return `${timeObj.minutes}:${timeObj.seconds.toString().padStart(2, '0')}`;
        default:
            return `${timeObj.minutes} minutes and ${timeObj.seconds} seconds`;
    }
}

export { formatReadingTime };