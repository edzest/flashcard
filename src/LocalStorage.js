export const getSavedWords = (topic) => {
    const key = `ez-fc-progress-${topic}`;
    let savedData = localStorage.getItem(key)
    if (!savedData) {
        savedData = "[]"
    }
    return JSON.parse(savedData)
}

export const getSavedWordCount = (topic) => {
    const words = getSavedWords(topic);
    return words.length;
}

export const saveProgress = (topic, word) => {
    // save the known words in local storage
    // so that it can be filtered out upon next load
    const key = `ez-fc-progress-${topic}`;
    const savedWords = getSavedWords(topic)
    savedWords.push(word)
    localStorage.setItem(key, JSON.stringify(savedWords))
}

export const clearProgress = (topic) => {
    const key = `ez-fc-progress-${topic}`;
    localStorage.removeItem(key);
}

export const clearAllProgress = () => {
    const prefix = 'ez-fc-progress-';
    var keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.startsWith(prefix)) {
            keys.push(key)
        }
    }
    for (let i = 0; i < keys.length; i++) {
        localStorage.removeItem(keys[i]);
    }
}