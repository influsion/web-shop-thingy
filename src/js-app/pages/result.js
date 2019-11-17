function renderResultPage(e, $target) {
    function template(data) {
        return (`
            And there is no finished page!
        `);
    }

    const page = template();

    console.log('renderResultPage');
    global.$main.first().html(page);
    afterChangingTheDOM();

    function afterChangingTheDOM() {
        // Код, который нужно запустить после изменения DOM
    }
}