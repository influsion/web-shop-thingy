'use strict';

const languageSettings = {
    key: 'web-shop-thingy_language-settings',

    init(settingsObject) {
        this._settings = { ...settingsObject };

        const savedKey = this.getFromLocalStorage();
        const { key: newKey = this._settings.default } = this._settings.available.find(item => item.key === savedKey) || {};

        this._settings.active = newKey;
        this.saveToLocalStorage(newKey);
    },
    getFromLocalStorage() {
        return storage.getItem(this.key);
    },
    saveToLocalStorage(val) {
        return storage.setItem(this.key, val);
    },
    getName(key) {
        const { name = null } = this._settings.available.find(item => item.key === key) || {};
        return name;
    },
    setActiveKey(key) {
        this.saveToLocalStorage(key);
        reloadPage();
    },
    get() {
        return { ...this._settings };
    },
    getLanguageKey() {
        // return (this._settings || {}).active || lang || '';
        return this.getFromLocalStorage();
    }
};