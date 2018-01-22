(function(){
    var menu     = document.getElementById('side-menu'),
        cart     = document.getElementById('cart'),
        search   = document.getElementById('search'),
        account  = document.getElementById('account'),
        shadow   = document.getElementById('shadow'),
        body     = document.body;


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


    var loginTrigger        = document.getElementById('account-login-trigger'),
        signUpTrigger       = document.getElementById('account-sign-up-trigger'),
        forgotPassTrigger   = document.getElementById('forgot-pass-trigger'),
        backToLoginTrigger  = document.getElementById('back-to-login-trigger'),
        loginBlock          = document.getElementById('m21-login'),
        sugnUpBlock         = document.getElementById('m21-signup'),
        forgotPassBlock     = document.getElementById('m21-reset-password'),
        showPassButtons     = document.getElementsByClassName('hide-password');


    showPassButtons[0].addEventListener('click', function (e) {
        e.preventDefault();

        hideShowPass(this);
    })

    showPassButtons[1].addEventListener('click', function (e) {
        e.preventDefault();

        hideShowPass(this);
    })

    loginTrigger.addEventListener('click', function (e) {
        e.preventDefault();

        loginSelected();
    })

    signUpTrigger.addEventListener('click', function (e) {
        e.preventDefault();

        signUpSelected();
    })

    forgotPassTrigger.addEventListener('click', function (e) {
        e.preventDefault();

        forgotPassSelected();
    })


    backToLoginTrigger.addEventListener('click', function (e) {
        e.preventDefault();

        loginSelected();
    })

    function loginSelected() {
        loginTrigger.classList.add('selected');
        signUpTrigger.classList.remove('selected');

        loginBlock.classList.add('is-selected');
        sugnUpBlock.classList.remove('is-selected');
        forgotPassBlock.classList.remove('is-selected');
    }

    function signUpSelected() {
        signUpTrigger.classList.add('selected');
        loginTrigger.classList.remove('selected');

        sugnUpBlock.classList.add('is-selected');
        loginBlock.classList.remove('is-selected');
        forgotPassBlock.classList.remove('is-selected');
    }

    function forgotPassSelected() {
        loginTrigger.classList.add('selected');
        signUpTrigger.classList.remove('selected');

        forgotPassBlock.classList.add('is-selected');
        sugnUpBlock.classList.remove('is-selected');
        loginBlock.classList.remove('is-selected');
    }

    function hideShowPass(button) {
        var passField = button.previousElementSibling;

        (('password' == passField.getAttribute('type')) ? passField.setAttribute('type', 'text') : passField.setAttribute('type', 'password'));
        (('Скрыть' == button.textContent) ? button.textContent = 'Показать' : button.textContent = 'Скрыть')
    }





    document.getElementById('m21-parts-select-results').addEventListener('click', function(e) {
        e.preventDefault();

        var tar = e.target;
        while (tar != this) {
            if (tar.className.indexOf('m21-parts-select__item') > -1) {
                document.getElementById('m21-parts-select__item-modal').classList.add('is-visible');
                console.log('AAAAAAAAAAAAAAAAAAAAAA!!!!!!');
                return;
            }
            tar = tar.parentNode;
        }
        console.log(e);
    })

    document.getElementById('m21-parts-select__item-modal_close').addEventListener('click', function (e) {
        e.preventDefault();

        document.getElementById('m21-parts-select__item-modal').classList.remove('is-visible');
    })
})();