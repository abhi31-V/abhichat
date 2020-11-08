const socket=io('http://localhost:8000');
const form=document.getElementById('sc')
const mi=document.getElementById('messageInp')
const mc=document.querySelector(".con")
audio =new Audio('ping_idea.mp3')
const append=(message,position)=>
{
    const me=document.createElement('div')
me.innerText=message
me.classList.add('m')
me.classList.add(position)
mc.append(me)
if(position=='l')
{
    audio.play()
}
}
const n=window.prompt("Enter your name: ")
socket.emit('new-user',n)
socket.on('user-connected',name=>
{
    console.log('chala.....')
    append(`${name} joined the chat `,'mi')
})
socket.on('receive',data=>
{
    append(`${data.name}: ${data.message}`,'l')
})
form.addEventListener('submit',(e)=>
{
    e.preventDefault()
const mess=mi.value
append(`you:${mess}`,'r')
socket.emit('send',mess)
mi.value=''
})
socket.on('user-disconnected',name=>
{
    append(`${name} left the chat `,'mi')
})