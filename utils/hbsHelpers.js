const hbsHelpers = {
    increment: (index) => {
        index++
        return index
    },
    toLocaleDate: (date) => {
        return date.toLocaleString()
    },
    isDecrypted: (decryptedAt) => {
        if(!decryptedAt) return 'not decrypted';
        decryptedAt.toLocaleString();
    }
}

module.exports = hbsHelpers;