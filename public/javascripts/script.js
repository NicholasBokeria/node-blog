/* eslint-disable */
jQuery('.switch-forms').on('click', event => {
    if(event.target.classList.value == 'signup-switch') {
        jQuery('.signup').show(200)
        jQuery('.signin').hide(200)

        jQuery('.signup-switch').css('text-decoration', 'underline')
        jQuery('.signin-switch').css('text-decoration', 'none')
    } 
    if(event.target.classList.value == 'signin-switch') {
        jQuery('.signup').hide(200)
        jQuery('.signin').show(200)

        jQuery('.signin-switch').css('text-decoration', 'underline')
        jQuery('.signup-switch').css('text-decoration', 'none')
    }
})

jQuery('#register').on('click', event => {
    event.preventDefault()

    let email = jQuery("input[name='email']").val()
    let password = jQuery("input[name='password']").val()
    let repeatPassword = jQuery("input[name='repeat-password']").val()

    let data = { email, password, repeatPassword }
    
    jQuery.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/api/auth/register'
    }).done(data => {
        console.log(data)
    })
})