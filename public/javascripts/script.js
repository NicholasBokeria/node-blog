/* eslint-disable */
//Switch forms
jQuery('.switch-forms').on('click', event => {
    if (event.target.classList.value == 'signup-switch') {
        jQuery('.signup').show(200)
        jQuery('.signin').hide(200)

        jQuery('.signup-switch').css('text-decoration', 'underline')
        jQuery('.signin-switch').css('text-decoration', 'none')
    }
    if (event.target.classList.value == 'signin-switch') {
        jQuery('.signup').hide(200)
        jQuery('.signin').show(200)

        jQuery('.signin-switch').css('text-decoration', 'underline')
        jQuery('.signup-switch').css('text-decoration', 'none')
    }
})

//register
jQuery('#register').on('click', event => {
    event.preventDefault()

    let email = jQuery("input[name='email']").val()
    let login = jQuery("input[name='login']").val()
    let password = jQuery("input[name='password']").val()
    let repeatPassword = jQuery("input[name='repeat-password']").val()

    let data = { email, login, password, repeatPassword }

    ajaxCall('/api/auth/register', data)
})

//authorisation
jQuery('#authorisation').on('click', event => {
    event.preventDefault()

    let email = jQuery("input[name='auth-email']").val()
    let password = jQuery("input[name='auth-password']").val()

    let data = { email, password }

    ajaxCall('/api/auth/login', data)
})

let ajaxCall = (url, data) => {
    jQuery.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url
    }).done(data => {
        location.reload()
    })
}