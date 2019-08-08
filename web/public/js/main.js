$(document).ready(() => {
    $('.users').on('click', () => {
        location.href='/users';
    })

    $('.albums').on('click', () => {
        location.href='/albums';
    })
    
    $('.photos').on('click', () => {
        location.href='/photos';
    })

    
    $('.login').on('submit', async (e) => {
        e.preventDefault();
        let email = $('#email').val();
        let password = $('#password').val();
        fetch('http://localhost:3000/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email,password})
        }).then((resp)=>{
            if(resp.status===400){
                throw new Error();
            }
            return resp.json();
        }).then((data)=>{
            window.location.href = data.redirectURL;
        }).then(()=>alert('Login successful!'))
        .catch(()=>alert('Login Unsuccessful!'));
    });

    $('.logout').on('click', () => {
        //deletes all cookies and redirect to main page
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        window.location.href = '/';
    })
})