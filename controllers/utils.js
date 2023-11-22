function generateSchClassID() {
    const uuid = 'xxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });

    return 'SCH-' + uuid;
}

exports.generateSchClassID = generateSchClassID;
