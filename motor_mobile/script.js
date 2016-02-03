(function(){
    var menu = document.getElementById('side-menu'),
        cart = document.getElementById('cart'),
        search = document.getElementById('search'),
        account = document.getElementById('account'),
        shadow = document.getElementById('shadow'),
        body = document.body;


    document.getElementById('cart-trigger').addEventListener('click', function(e) {
        e.preventDefault();
        hideAllExcept(cart);
        toggle_panel_visibility(cart, shadow, body);
    })

    document.getElementById('menu-trigger').addEventListener('click', function(e) {
        e.preventDefault();
        hideAllExcept(menu)
        toggle_panel_visibility(menu, shadow, body);
    })

    document.getElementById('search-trigger').addEventListener('click', function(e) {
        e.preventDefault();
        hideAllExcept(search)
        toggle_panel_visibility(search, shadow, body);
    })

    document.getElementById('account-trigger').addEventListener('click', function(e) {
        e.preventDefault();
        hideAllExcept(account);
        toggle_panel_visibility(account, shadow, body);
    })
    shadow.addEventListener('click', function (e) {
        e.preventDefault();

        shadow.classList.remove('is-visible');
        hideAllExcept('lalalalala');
        body.classList.remove('overflow-hidden');
    })

    function toggle_panel_visibility ($lateral_panel, $background_layer, $body) {
        if( $lateral_panel.classList.contains('speed-in') ) {
            // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
            $lateral_panel.classList.remove('speed-in');
            $body.classList.remove('overflow-hidden');
            $background_layer.classList.remove('is-visible');

        } else {
            $lateral_panel.classList.add('speed-in');
            $body.classList.add('overflow-hidden');
            $background_layer.classList.add('is-visible');
        }
    }

    function hideAllExcept(element) {
        var elements = [menu, search, account, cart];
        for (var i=0; i<elements.length; i++) {
            if (elements[i].className.indexOf('speed-in')>0 && element !== elements[i]) {
                elements[i].classList.remove('speed-in');
            }
        }
    }
})();