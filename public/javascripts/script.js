/* eslint-disable */
jQuery('#register').on('click', (event) => {
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