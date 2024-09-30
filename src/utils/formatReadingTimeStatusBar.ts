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

function setNullReadingTime(format: string): string{
    switch (format) {
        case 'long':
            return `0 minutes and 0 seconds`;
        case 'short':
            return `0m 0s`;
        case 'compact':
            return `0:0`;
        default:
            return `0 minutes and 0 seconds`;
    }
}

export { formatReadingTime, setNullReadingTime };