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

        const anchor = $target
            ? getHash($target)
            : sessionStorage.getItem('web-shop-thingy_anchor');

        const isCorrectAnchor = $target && $target.length && this.pagesController.hasOwnProperty(anchor);

        if (!isCorrectAnchor) {
            console.error('Hash is absent');

            const $link = this.$links.filter(`[href="${anchor}"]`);

            const $target = $link && $link.length
                ? $link
                : this.$links.first();

            this.setActivePage(e, $target);
        } else {
            console.info('Hash available', anchor);

            sessionStorage.setItem('web-shop-thingy_anchor', anchor);
            this.pagesController[anchor](e, $target);
            this.$links.removeClass('active');
            $target.addClass('active');
        }
    }
};