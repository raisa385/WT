
const form=document.querySelector('form');

form.addEventListener('submit', function(e){
    const name=document.getElementById('name');
    const email=document.getElementById('email');
    const msg=document.getElementById('msg');

    if(name.value==="")
    {
        alert("Forgot to write your name?");
        e.preventDefault();
        return;
    }

    if(msg.value===""){
        alert("Forgot to leave a message?");
        e.preventDefault();
        return;
    }
    if(msg.value.length<10){
        alert("Message must be at least 10 characters long")
        e.preventDefault();
        return;
    }
    if(email.value===""){
        alert("Forgot to write your email?");
        e.preventDefault();
        return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email.value)){
        alert("Please enter a valid email address!");
        e.preventDefault();
        return;
    }

    //if all ok,
    e.preventDefault();
    const p_card= document.createElement('div');
    p_card.classList.add('p_card');
    p_card.innerHTML=`
        <div style="font-size:20px; margin-bottom:5px;"><strong>Sent</strong></div>
        <p style="font-size:17px;margin-botton:5px;">Your message has been sent. I'll reach out soon!</p> 
    `;
    document.body.appendChild(p_card);
    form.reset();
    setTimeout(()=>{p_card.remove();},5000)});/*5s pop up at right bottom coner [5]*/