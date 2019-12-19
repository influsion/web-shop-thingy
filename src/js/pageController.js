'use strict';

const pageController = {
    init($links) {
        this.$links = $links;
    },

    pagesController: {
        '#home': (e, $target) => renderHomePage(e, $target),
        '#shop': (e, $target) => renderShopPage(e, $target),
        '#faq': (e, $target) => renderFaqPage(e, $target),
        '#contact': (e, $target) => renderContactPage(e, $target),
        '#about': (e, $target) => renderAboutPage(e, $target),

        '#product': (e, $target) => renderProductPage(e, $target),
        '#cart': (e, $target) => renderCartPage(e, $target),
        '#checkout': (e, $target) => renderCheckoutPage(e, $target),
        '#result': (e, $target) => renderResultPage(e, $target),
    },

    setActivePage(e = null, $target = null) {
        e && e.preventDefault();

        const getHash = $elem => $elem.get(0).hash || $elem.get(0).dataset.hash;

        const isExisting = !!$target;
        const isHash = isExisting && getHash($target);
        const hasSavedHash = !!tempStorage.getItem('web-shop-thingy_anchor');
        const isSavedHash = hasSavedHash && tempStorage.getItem('web-shop-thingy_anchor');
        const isReRender = !!e && isExisting && hasSavedHash && (isHash === isSavedHash);
        const isMandatory = $target && `${$target.get(0).dataset.mandatory}`.toLowerCase() === 'true';
        console.log('This is an attempt to re-render: ', isReRender, isMandatory);

        const anchor = $target
            ? getHash($target)
            : tempStorage.getItem('web-shop-thingy_anchor');

        const isCorrectAnchor = this.pagesController.hasOwnProperty(anchor); // $target && $target.length && this.pagesController.hasOwnProperty(anchor);

        if (!isCorrectAnchor) {
            console.error('Hash is absent');

            const $link = this.$links.filter(`[href="${anchor}"]`);

            const $target = $link && $link.length
                ? $link
                : this.$links.first();

            this.setActivePage(e, $target);
        } else if (!isReRender || isMandatory) {
            console.info('Hash available', anchor);

            $('html').scrollTop(0);

            const $menuItem = this.$links.filter(`[href="${anchor}"]`).eq(0);
            const fromMenu = $menuItem.length > 0;
            const $createdTarget = fromMenu ? $menuItem : $(`<a href="${anchor}"></a>`);

            tempStorage.setItem('web-shop-thingy_anchor', anchor);
            this.pagesController[anchor](e, $target || $createdTarget);
            this.$links.removeClass('active');
            ($target || $createdTarget).addClass('active');
        }
    }
};